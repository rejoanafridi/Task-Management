import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  filter: '',
  sort: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
    },
    addFilter: (state, action) => {
      state.filter = action.payload;
    },
    addSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { addSearch, addFilter, addSort } = tasksSlice.actions;

export default tasksSlice.reducer;
