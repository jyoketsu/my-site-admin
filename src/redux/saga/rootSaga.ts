import { all } from "redux-saga/effects";
import es6promise from "es6-promise";
import authSagas from "./authSaga";
import articleSagas from "./articleSaga";
import categorySagas from "./categorySaga";
import tagSagas from "./tagSaga";
import systemSagas from "./systemSaga";

es6promise.polyfill();

function* rootSaga() {
  yield all([
    ...authSagas,
    ...articleSagas,
    ...categorySagas,
    ...tagSagas,
    ...systemSagas,
  ]);
}

export default rootSaga;
