export const actionTypes = {
  LOGIN: "LOGIN",
  LOGIN_SUCCEEDED: "LOGIN_SUCCEEDED",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  REGISTER_SUCCEEDED: "REGISTER_SUCCEEDED",
  LOGIN_BY_TOKEN: "LOGIN_BY_TOKEN",
  LOGIN_BY_TOKEN_SUCCEEDED: "LOGIN_BY_TOKEN_SUCCEEDED",
};

export function login(username: string, password: string) {
  return {
    type: actionTypes.LOGIN,
    username: username,
    password: password,
  };
}

export function loginSuccess(data: any) {
  return {
    type: actionTypes.LOGIN_SUCCEEDED,
    data,
  };
}

export function register(username: string, password: string) {
  return {
    type: actionTypes.REGISTER,
    username: username,
    password: password,
  };
}

export function registerSuccess(data: any) {
  return {
    type: actionTypes.REGISTER_SUCCEEDED,
    data,
  };
}

export function loginByToken() {
  return {
    type: actionTypes.LOGIN_BY_TOKEN,
  };
}

export function loginByTokenSuccess(data: any) {
  return {
    type: actionTypes.LOGIN_BY_TOKEN_SUCCEEDED,
    data,
  };
}
