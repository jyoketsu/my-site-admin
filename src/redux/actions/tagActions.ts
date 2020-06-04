export const actionTypes = {
  // --- tag ---
  ADD_TAG: "ADD_TAG",
  ADD_TAG_SUCCEEDED: "ADD_TAG_SUCCEEDED",
  DELETE_TAG: "DELETE_TAG",
  DELETE_TAG_SUCCEEDED: "DELETE_TAG_SUCCEEDED",
  EDIT_TAG: "EDIT_TAG",
  EDIT_TAG_SUCCEEDED: "EDIT_TAG_SUCCEEDED",
  GET_TAGS: "GET_TAGS",
  GET_TAGS_SUCCEEDED: "GET_TAGS_SUCCEEDED",
};

export function getTags() {
  return {
    type: actionTypes.GET_TAGS,
  };
}
export function getTagsSuccess(data: any) {
  return {
    type: actionTypes.GET_TAGS_SUCCEEDED,
    data,
  };
}
export function addTag(name: string, color: string) {
  return {
    type: actionTypes.ADD_TAG,
    name,
    color,
  };
}
export function addTagSuccess(data: any) {
  return {
    type: actionTypes.ADD_TAG_SUCCEEDED,
    data,
  };
}
export function editTag(_id: string, name: string, color: string) {
  return {
    type: actionTypes.EDIT_TAG,
    _id,
    name,
    color,
  };
}
export function editTagSuccess(
  data: any,
  _id: string,
  name: string,
  color: string
) {
  return {
    type: actionTypes.EDIT_TAG_SUCCEEDED,
    data,
    _id,
    name,
    color,
  };
}
export function deleteTag(_id: string) {
  return {
    type: actionTypes.DELETE_TAG,
    _id,
  };
}
export function deleteTagSuccess(_id: string) {
  return {
    type: actionTypes.DELETE_TAG_SUCCEEDED,
    _id,
  };
}
