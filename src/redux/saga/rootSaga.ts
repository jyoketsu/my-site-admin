import { all } from "redux-saga/effects";
import es6promise from "es6-promise";
import articleSagas from "./articleSaga";
import categorySagas from "./categorySaga";
import tagSagas from "./tagSaga";

es6promise.polyfill();

function* rootSaga() {
  yield all([...articleSagas, ...categorySagas, ...tagSagas]);
}

export default rootSaga;
