import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  getCategoriesSuccess,
  addCategorySuccess,
  editCategorySuccess,
  deleteCategorySuccess,
} from "../actions/categoryAction";
import { Failed } from "../actions/commonActions";
import api from "../../util/api";

function* getCategories() {
  try {
    const res = yield call(api.category.getCategories);
    if (res.status === 200) {
      yield put(getCategoriesSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* addCategory(action: any) {
  try {
    const res = yield call(api.category.createCategory, action.name);
    if (res.status === 200) {
      yield put(addCategorySuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* editCategory(action: any) {
  try {
    const res = yield call(api.category.editCategory, action._id, action.name);
    if (res.status === 200) {
      yield put(editCategorySuccess(res, action._id, action.name));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* deleteCategory(action: any) {
  try {
    const res = yield call(api.category.deleteCategory, action._id);
    if (res.status === 200) {
      yield put(deleteCategorySuccess(action._id));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

const categorySagas = [
  takeLatest(actionTypes.ADD_CATEGORY, addCategory),
  takeLatest(actionTypes.DELETE_CATEGORY, deleteCategory),
  takeLatest(actionTypes.EDIT_CATEGORY, editCategory),
  takeLatest(actionTypes.GET_CATEGORIES, getCategories),
];
export default categorySagas;
