import { actionTypes } from "../actions/systemActions";
import { message } from "antd";

export interface SystemReducer {
  systems: any[];
}

const defaultState: SystemReducer = {
  systems: [],
};

export const system = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.RELOAD_PM2_SUCCEEDED: {
      message.success("服务重载成功！");
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
