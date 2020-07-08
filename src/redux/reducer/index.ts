import { combineReducers } from "redux";
import { article } from "./article";
import { common } from "./common";
import { category } from "./category";
import { tag } from "./tag";
import { auth } from "./auth";
import { system } from "./system";

export const rootReducer = combineReducers({
  auth: auth,
  common: common,
  article: article,
  category: category,
  tag: tag,
  system: system,
});

export type RootState = ReturnType<typeof rootReducer>;
