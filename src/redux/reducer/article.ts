import { actionTypes } from "../actions/articleActions";

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
    case actionTypes.GET_ARTICLES_SUCCEEDED: {
      return {
        ...state,
        articles: action.data.result.array,
        total: action.data.result.count,
      };
    }
    case actionTypes.DELETE_ARTICLE_SUCCEEDED: {
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
    }
    case actionTypes.ADD_ARTICLE_SUCCEEDED: {
      // let articles = JSON.parse(JSON.stringify(state.articles));
      // articles.unshift(action.data.result);
      return {
        ...state,
        // articles: articles,
      };
    }
    case actionTypes.GET_ARTICLE_BY_ID_SUCCEEDED: {
      return {
        ...state,
        article: action.data.result,
      };
    }
    case actionTypes.EDIT_ARTICLE_SUCCEEDED:
      if (action.data.result.n) {
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
    case actionTypes.CLEAR_ARTICLE:
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
