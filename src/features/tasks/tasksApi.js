import { apiSlice } from "../api/apiSlice";

export const tasksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: () => `/tasks`,
			keepUnusedDataFor: 300,
			providesTags: ["tasks"],
		}),
		getTask: builder.query({
			query: (id) => `/tasks/${id}`,

			invalidatesTags: (result, error, arg) => [
				"task",
				{
					type: "task",
					id: arg.id,
				},
			],
		}),
		addTasks: builder.mutation({
			query: (data) => ({
				url: "/tasks",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
							draft.push(data);
						})
					);
				} catch (err) {
					console.log(err);
				}
			},
		}),
		editTasks: builder.mutation({
			query: ({ id, data }) => ({
				url: `/tasks/${id}`,
				method: "PATCH",
				body: data,
			}),
			// invalidatesTags: ["tasks"],
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const res = await queryFulfilled;
				if (res?.data?.id) {
					dispatch(
						apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
							let indexToUpdate = draft.findIndex((task) => task.id == arg.id);
							if (indexToUpdate !== -1) {
								draft[indexToUpdate] = res.data;
							}
						})
					);
					dispatch(
						apiSlice.util.updateQueryData(
							"getTask",
							arg.id.toString(),
							(draft) => {
								console.log("getTask cache update");
								Object.assign(draft, res.data);
							}
						)
					);
				}
			},
		}),

		deleteTask: builder.mutation({
			query: (id) => ({
				url: `/tasks/${id}`,
				method: "DELETE",
			}),
			// invalidatesTags: ["tasks"],

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				// optimistic update

				const optimisticUpdate = dispatch(
					apiSlice.util.updateQueryData("getTasks", arg.id, (draft) => {
						return draft?.filter((task) => task.id !== arg);
					})
				);
				try {
					await queryFulfilled;

					dispatch(
						apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
							return draft?.filter((task) => task.id !== arg);
						})
					);
				} catch (err) {
					console.log(err);
					optimisticUpdate.undo();
				}
			},
		}),
		updateStatus: builder.mutation({
			query: ({ id, data }) => ({
				url: `/tasks/${id}`,
				method: "PATCH",
				body: data,
			}),
			// invalidatesTags: ["tasks"],
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				const res = await queryFulfilled;
				if (res?.data?.id) {
					dispatch(
						apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
							let indexToUpdate = draft.findIndex((task) => task.id == arg.id);
							if (indexToUpdate !== -1) {
								draft[indexToUpdate] = res.data;
							}
						})
					);
					dispatch(
						apiSlice.util.updateQueryData(
							"getTask",
							arg.id.toString(),
							(draft) => {
								console.log("getTask cache update");
								Object.assign(draft, res.data);
							}
						)
					);
				}
			},
		}),
	}),
});

export const {
	useGetTasksQuery,
	useAddTasksMutation,
	useGetTaskQuery,
	useEditTasksMutation,
	useDeleteTaskMutation,
	useUpdateStatusMutation,
} = tasksApi;
