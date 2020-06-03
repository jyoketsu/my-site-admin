import { useSelector, TypedUseSelectorHook } from "react-redux";
import { ArticleReducer } from "./reducer/article";
import { Common } from "./reducer/common";
import { CategoryReducer } from "./reducer/category";
import { TagReducer } from "./reducer/tag";

interface RootState {
  common: Common;
  article: ArticleReducer;
  category: CategoryReducer;
  tag: TagReducer;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
