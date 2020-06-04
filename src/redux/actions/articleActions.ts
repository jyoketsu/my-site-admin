export const actionTypes = {
  // --- articles ---
  ADD_ARTICLE: "ADD_ARTICLE",
  ADD_ARTICLE_SUCCEEDED: "ADD_ARTICLE_SUCCEEDED",
  DELETE_ARTICLE: "DELETE_ARTICLE",
  DELETE_ARTICLE_SUCCEEDED: "DELETE_ARTICLE_SUCCEEDED",
  EDIT_ARTICLE: "EDIT_ARTICLE",
  EDIT_ARTICLE_SUCCEEDED: "EDIT_ARTICLE_SUCCEEDED",
  GET_ARTICLES: "GET_ARTICLES",
  GET_ARTICLES_SUCCEEDED: "GET_ARTICLES_SUCCEEDED",
  GET_ARTICLE_BY_ID: "GET_ARTICLE_BY_ID",
  GET_ARTICLE_BY_ID_SUCCEEDED: "GET_ARTICLE_BY_ID_SUCCEEDED",
  CLEAR_ARTICLE: "CLEAR_ARTICLE",
};

// --- articles ---
export function getArticles(current: number, pageSize: number) {
  return {
    type: actionTypes.GET_ARTICLES,
    current: current,
    pageSize: pageSize,
  };
}
export function getArticlesSuccess(data: any) {
  return {
    type: actionTypes.GET_ARTICLES_SUCCEEDED,
    data,
  };
}
export function getArticleById(_id: number) {
  return {
    type: actionTypes.GET_ARTICLE_BY_ID,
    _id,
  };
}
export function getArticleByIdSuccess(data: any) {
  return {
    type: actionTypes.GET_ARTICLE_BY_ID_SUCCEEDED,
    data,
  };
}
export function deleteArticle(_id: string) {
  return {
    type: actionTypes.DELETE_ARTICLE,
    _id,
  };
}
export function deleteArticleSuccess(_id: string) {
  return {
    type: actionTypes.DELETE_ARTICLE_SUCCEEDED,
    _id,
  };
}
export function editArticle(
  _id: string,
  title: string,
  cover: string,
  snippet: string,
  content: string,
  category: string,
  tags: string[]
) {
  return {
    type: actionTypes.EDIT_ARTICLE,
    _id,
    title,
    cover,
    snippet,
    content,
    category,
    tags,
  };
}
export function editArticleSuccess(
  data: any,
  content: string,
  category: string,
  tag: string
) {
  return {
    type: actionTypes.EDIT_ARTICLE_SUCCEEDED,
    data,
    content,
    category,
    tag,
  };
}
export function addArticle(
  title: string,
  cover: string,
  snippet: string,
  content: string,
  auth: string,
  category: string,
  tags: string[],
  aticleType: number
) {
  return {
    type: actionTypes.ADD_ARTICLE,
    title,
    cover,
    snippet,
    content,
    auth,
    category,
    tags,
    aticleType,
  };
}
export function addArticleSuccess(data: any) {
  return {
    type: actionTypes.ADD_ARTICLE_SUCCEEDED,
    data,
  };
}
export function clearArticle() {
  return {
    type: actionTypes.CLEAR_ARTICLE,
  };
}
