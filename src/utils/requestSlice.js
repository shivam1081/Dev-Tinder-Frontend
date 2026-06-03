import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequestData: (state, action) => {
      return action.payload;
    },
    removeParticularRequest: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
    removeRequestData: () => {
      return null;
    },
  },
});

export const { addRequestData, removeRequestData, removeParticularRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
