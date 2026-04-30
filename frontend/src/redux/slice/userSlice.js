import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: "",
    users:[]
  },
  reducers: {
    pending: (state) => {
      return { ...state, loading: true };
    },
    failed: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    success: (state, action) => {
      return { ...state, loading: false, users: action.payload };
    },
  },
});

export const { pending, failed, success } = userSlice.actions;

export default userSlice.reducer;
