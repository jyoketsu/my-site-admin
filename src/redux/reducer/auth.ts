import { actionTypes } from "../actions/authActions";

export interface AuthType {
  user: any;
  expired: boolean;
}

const defaultState: AuthType = {
  user: null,
  expired: false,
};

export const auth = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCEEDED:
    case actionTypes.LOGIN_BY_TOKEN_SUCCEEDED:
      return {
        ...state,
        user: action.data.result,
        expired: false,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        expired: true,
      };
    case actionTypes.REGISTER_SUCCEEDED:
      return {
        ...state,
        user: action.data.result,
        expired: false,
      };
    case actionTypes.LOGOUT:
      window.localStorage.clear();
      return {
        ...state,
        user: null,
        expired: true,
      };
    default:
      return state;
  }
};
