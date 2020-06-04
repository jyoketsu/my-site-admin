import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  getTagsSuccess,
  addTagSuccess,
  editTagSuccess,
  deleteTagSuccess,
} from "../actions/tagActions";
import { Failed } from "../actions/commonActions";
import api from "../../util/api";

function* getTags() {
  try {
    const res = yield call(api.tag.getTags);
    if (res.status === 200) {
      yield put(getTagsSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* addTag(action: any) {
  try {
    const res = yield call(api.tag.createTag, action.name, action.color);
    if (res.status === 200) {
      yield put(addTagSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* editTag(action: any) {
  try {
    const res = yield call(
      api.tag.editTag,
      action._id,
      action.name,
      action.color
    );
    if (res.status === 200) {
      yield put(editTagSuccess(res, action._id, action.name, action.color));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* deleteTag(action: any) {
  try {
    const res = yield call(api.tag.deleteTag, action._id);
    if (res.status === 200) {
      yield put(deleteTagSuccess(action._id));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

const tagSagas = [
  takeLatest(actionTypes.ADD_TAG, addTag),
  takeLatest(actionTypes.DELETE_TAG, deleteTag),
  takeLatest(actionTypes.EDIT_TAG, editTag),
  takeLatest(actionTypes.GET_TAGS, getTags),
];
export default tagSagas;
