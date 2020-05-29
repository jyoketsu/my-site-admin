import api from "./api";
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../store/types";
import { message } from "antd";

const promiseMiddleware = (store: any) => (next: any) => (action: any) => {
  if (isPromise(action.payload)) {
    store.dispatch({
      type: ASYNC_START,
      flag: action.flag,
    });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then((res: any) => {
      const currentState = store.getState();
      if (!skipTracking && currentState.viewChangeCounter !== currentView) {
        return;
      }
      if (parseInt(res.status, 10) === 200) {
        action.payload = res;
        store.dispatch({
          type: ASYNC_END,
          promise: action.payload,
        });
        store.dispatch(action);
      } else {
        action.error = true;
        action.payload = res;
        if (res.status !== "701") {
          message.error(res.msg);
        } else {
          window.location.href = `${window.location.origin}${window.location.pathname}`;
        }
        store.dispatch({ type: ASYNC_END });
        store.dispatch(action);
      }
    });
    return;
  }

  next(action);
};

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem("TOKEN", action.payload.token);
      api.setToken(action.payload.token);
    }
  } else if (action.type === REGISTER) {
    if (!action.error) {
      window.localStorage.setItem("TOKEN", action.payload.data.token);
      api.setToken(action.payload.data.token);
    }
  } else if (action.type === LOGOUT) {
    window.sessionStorage.clear();
    window.localStorage.clear();
    api.setToken("");
  }
  next(action);
};

function isPromise(v: any) {
  return v && typeof v.then === "function";
}

export { promiseMiddleware, localStorageMiddleware };
