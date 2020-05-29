import { useSelector, TypedUseSelectorHook } from "react-redux";
import { Article } from "./reducer/article";
import { Common } from "./reducer/common";
import { Category } from "./reducer/category";
import { Tag } from "./reducer/tag";

interface RootState {
  common: Common;
  article: Article;
  category: Category;
  tag: Tag;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
