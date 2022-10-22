import { csrfFetch } from "./csrf";

const GET_SONG = "/songDetails/getSong";
const EDIT_SONG = "/songs/editSong";
// const DELETE_SONG = "/songs/deleteSong";

const getSong = (song) => {
  return {
    type: GET_SONG,
    payload: song,
  };
};

// export const deleteSong = (id) => {
//   return {
//     type: DELETE_SONG
//   };
// };


export const fetchSongDetails = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getSong(data));
    return response;
  }
};


const initialState = {};

const songsDetailsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SONG:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case EDIT_SONG:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    // case DELETE_SONG:
    //   newState = {};
    //   return newState;
    default:
      return state;
  }
};

export default songsDetailsReducer;
