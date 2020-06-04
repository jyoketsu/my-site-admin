export const actionTypes = {
  // --- category ---
  ADD_CATEGORY: "ADD_CATEGORY",
  ADD_CATEGORY_SUCCEEDED: "ADD_CATEGORY_SUCCEEDED",
  DELETE_CATEGORY: "DELETE_CATEGORY",
  DELETE_CATEGORY_SUCCEEDED: "DELETE_CATEGORY_SUCCEEDED",
  EDIT_CATEGORY: "EDIT_CATEGORY",
  EDIT_CATEGORY_SUCCEEDED: "EDIT_CATEGORY_SUCCEEDED",
  GET_CATEGORIES: "GET_CATEGORIES",
  GET_CATEGORIES_SUCCEEDED: "GET_CATEGORIES_SUCCEEDED",
};

// --- category ---
export function getCategories() {
  return {
    type: actionTypes.GET_CATEGORIES,
  };
}
export function getCategoriesSuccess(data: any) {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCEEDED,
    data,
  };
}
export function addCategory(name: string) {
  return {
    type: actionTypes.ADD_CATEGORY,
    name,
  };
}
export function addCategorySuccess(data: any) {
  return {
    type: actionTypes.ADD_CATEGORY_SUCCEEDED,
    data,
  };
}
export function editCategory(_id: string, name: string) {
  return {
    type: actionTypes.EDIT_CATEGORY,
    _id,
    name,
  };
}
export function editCategorySuccess(data: any, _id: string, name: string) {
  return {
    type: actionTypes.EDIT_CATEGORY_SUCCEEDED,
    data,
    _id,
    name,
  };
}
export function deleteCategory(_id: string) {
  return {
    type: actionTypes.DELETE_CATEGORY,
    _id,
  };
}
export function deleteCategorySuccess(_id: string) {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCEEDED,
    _id,
  };
}
