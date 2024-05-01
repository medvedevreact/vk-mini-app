import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "../pages/main/api/newsSlice";

export const rootReducer = combineReducers({
  news: newsReducer,
});
