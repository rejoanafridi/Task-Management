import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeProject: [],
};

const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {
		addCheck: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { addCheck } = projectsSlice.actions;

export default projectsSlice.reducer;
