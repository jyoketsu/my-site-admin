import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionTypes,
  addArticleSuccess,
  deleteArticleSuccess,
  editArticleSuccess,
  getArticlesSuccess,
  getArticleByIdSuccess,
} from "../actions/articleActions";
import { Failed } from "../actions/commonActions";
import api from "../../util/api";

function* getArticles(action: any) {
  try {
    const res = yield call(api.article.get, action.current, action.pageSize);
    if (res.status === 200) {
      yield put(getArticlesSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* getArticleById(action: any) {
  try {
    const res = yield call(api.article.getById, action._id);
    if (res.status === 200) {
      yield put(getArticleByIdSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* addArticle(action: any) {
  try {
    const res = yield call(
      api.article.add,
      action.title,
      action.cover,
      action.snippet,
      action.content,
      action.auth,
      action.category,
      action.tags,
      action.aticleType
    );
    if (res.status === 200) {
      yield put(addArticleSuccess(res));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* editArticle(action: any) {
  try {
    const res = yield call(
      api.article.update,
      action._id,
      action.title,
      action.cover,
      action.snippet,
      action.content,
      action.category,
      action.tags
    );
    if (res.status === 200) {
      yield put(
        editArticleSuccess(res, action.content, action.category, action.tags)
      );
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

function* deleteArticle(action: any) {
  try {
    const res = yield call(api.article.delete, action._id);
    if (res.status === 200) {
      yield put(deleteArticleSuccess(action._id));
    } else {
      yield put(Failed(res));
    }
  } catch (e) {
    yield put(Failed(e));
  }
}

const articleSagas = [
  takeLatest(actionTypes.GET_ARTICLES, getArticles),
  takeLatest(actionTypes.GET_ARTICLE_BY_ID, getArticleById),
  takeLatest(actionTypes.ADD_ARTICLE, addArticle),
  takeLatest(actionTypes.EDIT_ARTICLE, editArticle),
  takeLatest(actionTypes.DELETE_ARTICLE, deleteArticle),
];
export default articleSagas;
