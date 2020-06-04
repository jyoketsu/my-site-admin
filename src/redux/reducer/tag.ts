import { actionTypes } from "../actions/tagActions";

interface Tag {
  _id: string;
  name: string;
  color: string;
}
export interface TagReducer {
  tags: Tag[];
}

const defaultState: TagReducer = {
  tags: [],
};

export const tag = (state = defaultState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_TAGS_SUCCEEDED:
      return {
        ...state,
        tags: action.data.result,
      };
    case actionTypes.ADD_TAG_SUCCEEDED: {
      let tags = JSON.parse(JSON.stringify(state.tags));
      tags.unshift(action.data.result);
      return {
        ...state,
        tags: tags,
      };
    }
    case actionTypes.EDIT_TAG_SUCCEEDED:
      if (action.data.result.n) {
        let tags = JSON.parse(JSON.stringify(state.tags));
        let i;
        for (let index = 0; index < tags.length; index++) {
          const element = tags[index];
          if (element._id === action._id) {
            i = index;
            break;
          }
        }

        if (i !== undefined) {
          tags[i].name = action.name;
          tags[i].color = action.color;
          tags[i].updateTime = new Date().getTime();
        }
        return {
          ...state,
          tags: tags,
        };
      } else {
        return state;
      }
    case actionTypes.DELETE_TAG_SUCCEEDED:
      let tags = JSON.parse(JSON.stringify(state.tags));
      let i;
      for (let index = 0; index < tags.length; index++) {
        const element = tags[index];
        if (element._id === action._id) {
          i = index;
          break;
        }
      }
      tags.splice(i, 1);
      return {
        ...state,
        tags: tags,
      };
    default:
      return state;
  }
};
