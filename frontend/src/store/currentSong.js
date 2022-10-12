import { csrfFetch } from "./csrf";

const GET_SONG = "/currentSong/getSong";


const getSong = (song) => {
  return {
    type: GET_SONG,
    payload: song,
  };
};

export const fetchCurrentSong = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getSong(data));
    return response;
  }
};


const initialState = {};

const currentSongReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SONG:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export default currentSongReducer;
