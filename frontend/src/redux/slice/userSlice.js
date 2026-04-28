import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: "",
    users:[]
  },
  reducers: {
    loading: (state) => {
      return { ...state, loading: true };
    },
    error: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    success: (state, action) => {
      return { ...state, loading: false, users: action.payload };
    },
  },
});

export const { loading, error, success } = userSlice.actions;

export default userSlice.reducer;
