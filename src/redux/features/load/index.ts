import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
};

export const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    loadStart: (state) => {
      state.loading = true;
    },
    loadDone: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadStart, loadDone } = loadSlice.actions;

export default loadSlice.reducer;
