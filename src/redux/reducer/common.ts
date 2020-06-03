import { ASYNC_START, ASYNC_END } from "../types";

export interface Common {
  loading: boolean;
}

const defaultState: Common = {
  loading: false,
};

export const common = (state = defaultState, action: any) => {
  switch (action.type) {
    case ASYNC_START:
      return {
        ...state,
        loading: true,
      };
    case ASYNC_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
