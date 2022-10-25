import { csrfFetch } from "./csrf";

const GET_COMMENTS = "/comments/getComments";

const getComments = (commentsObj) => {
  return {
    type: GET_COMMENTS,
    payload: commentsObj,
  };
};

export const fetchComments = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}/comments`);
  if (res.ok) {
    const data = await res.json();
    const comments = data.Comments;
    let commentsObj = {};
    comments.forEach((el) => {
      commentsObj[el.id] = el;
    });
    await dispatch(getComments(commentsObj));
    return commentsObj;
  }
};

export const fetchAddComment = (songId, comment) => async (dispatch) => {
  const commentObj = {body: comment}
  const res = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj)
  });
  if (res.ok) {
    await dispatch(fetchComments(songId));
  }
};

export const fetchDeleteComment = (songId, commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`,{
    method: 'DELETE'
  });
  if (res.ok) {
    await dispatch(fetchComments(songId))
  }
}

export const fetchEditComment = (commentId, comment, songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body:comment})
  })

  if (res.ok) {
    await dispatch(fetchComments(songId))
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
