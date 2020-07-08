import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ArticleReducer } from "./article";
import { Common } from "./common";
import { CategoryReducer } from "./category";
import { TagReducer } from "./tag";
import { AuthType } from "./auth";
import { SystemReducer } from "./system";

interface RootState {
  auth: AuthType;
  common: Common;
  article: ArticleReducer;
  category: CategoryReducer;
  tag: TagReducer;
  system: SystemReducer;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
