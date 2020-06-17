import { actionTypes as commonActionTypes } from "../actions/commonActions";
import { actionTypes as articleActionTypes } from "../actions/articleActions";
import { message } from "antd";

export interface Common {
  loading: boolean;
}

const defaultState: Common = {
  loading: false,
};

export const common = (state = defaultState, action: any) => {
  switch (action.type) {
    case articleActionTypes.GET_ARTICLES:
    case articleActionTypes.EDIT_ARTICLE:
      return {
        ...state,
        loading: true,
      };
    case commonActionTypes.FAILED:
      message.error(
        action.error.error ? action.error.error.message : action.error.msg
      );
      return {
        ...state,
        loading: false,
      };
    case articleActionTypes.GET_ARTICLES_SUCCEEDED:
    case articleActionTypes.EDIT_ARTICLE_SUCCEEDED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
