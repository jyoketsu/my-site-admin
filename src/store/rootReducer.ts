import { combineReducers } from "redux";
import { article } from "./reducer/article";
import { common } from "./reducer/common";

export const rootReducer = combineReducers({
  common: common,
  article: article,
});

export type RootState = ReturnType<typeof rootReducer>;
