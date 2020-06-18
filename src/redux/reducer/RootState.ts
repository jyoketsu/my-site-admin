import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ArticleReducer } from "./article";
import { Common } from "./common";
import { CategoryReducer } from "./category";
import { TagReducer } from "./tag";
import { AuthType } from "./auth";

interface RootState {
  auth: AuthType;
  common: Common;
  article: ArticleReducer;
  category: CategoryReducer;
  tag: TagReducer;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
