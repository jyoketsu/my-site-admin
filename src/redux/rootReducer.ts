import { combineReducers } from "redux";
import { article } from "./reducer/article";
import { common } from "./reducer/common";
import { category } from "./reducer/category";
import { tag } from "./reducer/tag";

export const rootReducer = combineReducers({
  common: common,
  article: article,
  category: category,
  tag: tag,
});

export type RootState = ReturnType<typeof rootReducer>;
