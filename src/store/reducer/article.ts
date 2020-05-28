import { GET_ARTICLES } from "../types";

export interface Article {
  articles: object[];
  total: number;
}

const defaultState: Article = {
  articles: [],
  total: 0,
};

export const article = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_ARTICLES:
      if (!action.error) {
        return {
          ...state,
          articles: action.payload.result.array,
          total: action.payload.result.count,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
