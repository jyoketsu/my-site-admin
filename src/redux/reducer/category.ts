import { actionTypes } from "../actions/categoryAction";

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
    case actionTypes.GET_CATEGORIES_SUCCEEDED: {
      return {
        ...state,
        categories: action.data.result,
      };
    }
    case actionTypes.ADD_CATEGORY_SUCCEEDED: {
      let categories = JSON.parse(JSON.stringify(state.categories));
      categories.unshift(action.data.result);
      return {
        ...state,
        categories: categories,
      };
    }
    case actionTypes.EDIT_CATEGORY_SUCCEEDED:
      if (action.data.result.n) {
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
    case actionTypes.DELETE_CATEGORY_SUCCEEDED: {
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
    }
    default:
      return state;
  }
};
