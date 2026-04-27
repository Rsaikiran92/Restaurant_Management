import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loading: (state) => {
      return { ...state, loading: true };
    },
    success: (state, action) => {
      return { ...state, loading: false, data: action.payload };
    },
    error: (state) => {
      return { ...state, loading: false, error: true };
    },
  },
});

export const { loading, success, error } = userSlice.actions;

export default userSlice.reducer;