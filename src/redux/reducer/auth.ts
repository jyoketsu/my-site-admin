import { actionTypes } from "../actions/authActions";

export interface AuthType {
  user: any;
}

const defaultState: AuthType = {
  user: null,
};

export const auth = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCEEDED:
      return {
        ...state,
        user: action.data.result,
      };
    case actionTypes.REGISTER_SUCCEEDED:
      return {
        ...state,
        user: action.data.result,
      };
    default:
      return state;
  }
};
