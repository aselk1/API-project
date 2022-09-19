import { csrfFetch } from "./csrf";

const GET_SONGS = '/songs/getSongs';

const getSongs = (songsObj) => {
    return {
        type: GET_SONGS,
        payload: songsObj
    }
}

export const fetchAllSongs = () => async (dispatch) => {
    const response = await csrfFetch("/api/songs", {
      method: "GET"
    });
    const data = await response.json();
    const songs = data.Songs
    const songsObj = {};
    songs.forEach((el) => {
        songsObj[el.id] = el
    })
    dispatch(getSongs(songsObj));
    return response;
}

const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SONGS:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    // case REMOVE_USER:
    //   newState = Object.assign({}, state);
    //   newState.user = null;
    //   return newState;
    default:
      return state;
  }
};

export default songsReducer;
