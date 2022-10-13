import { csrfFetch } from "./csrf";

const GET_COMMENTS = "/comments/getComments";

const getComments = (commentsObj) => {
  return {
    type: GET_COMMENTS,
    payload: commentsObj,
  };
};

export const fetchComments = (songId) => async (dispatch) => {
    const res = fetch(`/${songId}/comments`);
    if (res.ok) {
        const comments = await res.json();
        await dispatch(getComments(comments));
        return comments;
    }
}


const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    // case ADD_SONG:
    //   newState = Object.assign({}, state);
    //   newState[action.payload.id] = action.payload;
    //   return newState;
    // case DELETE_SONG:
    //   newState = Object.assign({}, state);
    //   delete newState[action.payload];
    //   return newState;
    default:
      return state;
  }
};

export default commentsReducer;
