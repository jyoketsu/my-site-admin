import {
  GET_ARTICLES,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  GET_ARTICLE_BY_ID,
  EDIT_ARTICLE,
  CLEAR_ARTICLE,
} from "../types";

interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  viewCount: number;
  auth: string;
  updateTime: string;
  createTime: string;
}
export interface ArticleReducer {
  articles: object[];
  total: number;
  article: Article;
}

const defaultState: ArticleReducer = {
  articles: [],
  total: 0,
  article: {
    _id: "",
    title: "",
    content: "",
    category: "",
    tags: [],
    viewCount: 0,
    auth: "",
    updateTime: "",
    createTime: "",
  },
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
    case DELETE_ARTICLE:
      if (!action.error) {
        let articles = JSON.parse(JSON.stringify(state.articles));
        let i;
        for (let index = 0; index < articles.length; index++) {
          const element = articles[index];
          if (element._id === action._id) {
            i = index;
            break;
          }
        }
        articles.splice(i, 1);
        return {
          ...state,
          articles: articles,
          total: state.total - 1,
        };
      } else {
        return state;
      }
    case ADD_ARTICLE:
      if (!action.error) {
        // let articles = JSON.parse(JSON.stringify(state.articles));
        // articles.unshift(action.payload.result);
        return {
          ...state,
          // articles: articles,
        };
      } else {
        return state;
      }
    case GET_ARTICLE_BY_ID:
      if (!action.error) {
        return {
          ...state,
          article: action.payload.result,
        };
      } else {
        return state;
      }
    case EDIT_ARTICLE:
      if (!action.error && action.payload.result.n) {
        let article = JSON.parse(JSON.stringify(state.article));
        article = {
          ...article,
          ...{
            content: action.content,
            category: action.category,
            tags: action.tag,
            updateTime: new Date(),
          },
        };
        return {
          ...state,
          article: article,
        };
      } else {
        return state;
      }
    case CLEAR_ARTICLE:
      return {
        ...state,
        article: {
          _id: "",
          title: "",
          content: "",
          category: "",
          tags: [],
          viewCount: 0,
          auth: "",
          updateTime: "",
          createTime: "",
        },
      };
    default:
      return state;
  }
};
