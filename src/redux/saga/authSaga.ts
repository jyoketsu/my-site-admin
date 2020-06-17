import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  loginSuccess,
  registerSuccess,
  loginByTokenSuccess,
} from "../actions/authActions";
import { Failed } from "../actions/commonActions";
import api from "../../util/api";

function* login(action: any) {
  try {
    const res = yield call(api.auth.login, action.username, action.password);
    if (res.status === 200) {
      api.setToken(res.token);
      yield put(loginSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* register(action: any) {
  try {
    const res = yield call(api.auth.register, action.username, action.password);
    if (res.status === 200) {
      api.setToken(res.token);
      yield put(registerSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* loginByToken(action: any) {
  try {
    const res = yield call(api.auth.loginByToken);
    if (res.status === 200) {
      yield put(loginByTokenSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

const authSagas = [
  takeLatest(actionTypes.LOGIN, login),
  takeLatest(actionTypes.REGISTER, register),
  takeLatest(actionTypes.LOGIN_BY_TOKEN, loginByToken),
];
export default authSagas;
