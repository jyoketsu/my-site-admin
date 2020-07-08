import { call, put, takeLatest } from "redux-saga/effects";
import { actionTypes, reloadPm2Success } from "../actions/systemActions";
import { Failed } from "../actions/commonActions";
import api from "../../util/api";

function* reloadPm2(action: any) {
  try {
    const res = yield call(api.system.pm2Reload, action.name);
    if (res.status === 200) {
      yield put(reloadPm2Success(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

const systemSaga = [takeLatest(actionTypes.RELOAD_PM2, reloadPm2)];
export default systemSaga;
