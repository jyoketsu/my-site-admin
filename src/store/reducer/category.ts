import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../types";

interface Category {
  _id: string;
  name: string;
}

export interface CategoryReducer {
  categories: Category[];
}

const defaultState: CategoryReducer = {
  categories: [],
};

export const category = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_CATEGORIES:
      if (!action.error) {
        return {
          ...state,
          categories: action.payload.result,
        };
      } else {
        return state;
      }
    case ADD_CATEGORY:
      if (!action.error) {
        let categories = JSON.parse(JSON.stringify(state.categories));
        categories.unshift(action.payload.result);
        return {
          ...state,
          categories: categories,
        };
      } else {
        return state;
      }
    case EDIT_CATEGORY:
      if (!action.error && action.payload.result.n) {
        let categories = JSON.parse(JSON.stringify(state.categories));
        let i;
        for (let index = 0; index < categories.length; index++) {
          const element = categories[index];
          if (element._id === action._id) {
            i = index;
            break;
          }
        }
        if (i !== undefined) {
          categories[i].name = action.name;
          categories[i].updateTime = new Date().getTime();
        }
        return {
          ...state,
          categories: categories,
        };
      } else {
        return state;
      }
    case DELETE_CATEGORY:
      if (!action.error) {
        let categories = JSON.parse(JSON.stringify(state.categories));
        let i;
        for (let index = 0; index < categories.length; index++) {
          const element = categories[index];
          if (element._id === action._id) {
            i = index;
            break;
          }
        }
        categories.splice(i, 1);
        return {
          ...state,
          categories: categories,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
