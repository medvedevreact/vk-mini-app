import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { newsItem } from "../../../app/types/types";

export const fetchNewStories = createAsyncThunk(
  "news/fetchNewStories",
  async () => {
    const response = await axios.get<number[]>(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    const storyIds = response.data;
    const stories = await Promise.all(
      storyIds
        .slice(0, 100)
        .map((id) =>
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((res) => res.data)
        )
    );

    console.log(stories);

    return stories;
  }
);

type newsSliceState = {
  news: newsItem[];
  loading: boolean;
};

const initialState: newsSliceState = {
  news: [],
  loading: false,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewStories.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(fetchNewStories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default newsSlice.reducer;
