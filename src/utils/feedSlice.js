import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeParticularFeed: (state, action) => {
      return state.filter((feedItem) => feedItem._id !== action.payload);
    },
    removeFeed: () => {
      return null;
    },
  },
});

export const { addFeed, removeFeed, removeParticularFeed } = feedSlice.actions;
export default feedSlice.reducer;
