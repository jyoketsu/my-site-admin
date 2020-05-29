import { GET_TAGS, ADD_TAG, EDIT_TAG, DELETE_TAG } from "../types";

export interface Tag {
  tags: object[];
}

const defaultState: Tag = {
  tags: [],
};

export const tag = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_TAGS:
      if (!action.error) {
        return {
          ...state,
          tags: action.payload.result,
        };
      } else {
        return state;
      }
    case ADD_TAG:
      if (!action.error) {
        let tags = JSON.parse(JSON.stringify(state.tags));
        tags.unshift(action.payload.result);
        return {
          ...state,
          tags: tags,
        };
      } else {
        return state;
      }
    case EDIT_TAG:
      if (!action.error && action.payload.result.n) {
        let tags = JSON.parse(JSON.stringify(state.tags));
        let i;
        for (let index = 0; index < tags.length; index++) {
          const element = tags[index];
          if (element._id === action._id) {
            i = index;
            break;
          }
        }
        if (i) {
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
    case DELETE_TAG:
      if (!action.error) {
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
      } else {
        return state;
      }
    default:
      return state;
  }
};
