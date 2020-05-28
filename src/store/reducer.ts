import { useSelector, TypedUseSelectorHook } from "react-redux";
import { Article } from "./reducer/article";
import { Common } from "./reducer/common";

interface RootState {
  common: Common;
  article: Article;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
