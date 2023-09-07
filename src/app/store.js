import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import teamSliceReducer from "../features/team/teamSlice";
import projectsSliceReducer from "../features/projects/projectsSlice";
import tasksSliceReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		team: teamSliceReducer,
		projects: projectsSliceReducer,
		tasks: tasksSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});
