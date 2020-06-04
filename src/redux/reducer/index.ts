import { combineReducers } from "redux";
import { article } from "./article";
import { common } from "./common";
import { category } from "./category";
import { tag } from "./tag";

export const rootReducer = combineReducers({
  common: common,
  article: article,
  category: category,
  tag: tag,
});

export type RootState = ReturnType<typeof rootReducer>;
