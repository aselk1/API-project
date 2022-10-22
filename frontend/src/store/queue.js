import { csrfFetch } from "./csrf";

const ADD_SONG = "/queue/addSong";
const PLAY_SONG = "/queue/playSong";
const CLEAR_QUEUE = "/queue/clear";
const ADD_QUEUE = "/queue/add";
const DELETE_SONG = "/queue/deleteSong";

const addSong = (song) => {
  return {
    type: ADD_SONG,
    payload: song,
  };
};

const playSong = (song) => {
  return {
    type: PLAY_SONG,
    payload: song,
  };
};

export const clearQueue = () => {
  return {
    type: CLEAR_QUEUE,
  };
};

export const addQueue = (queue) => {
  return {
    type: ADD_QUEUE,
    payload: queue,
  };
};

export const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    payload: songId,
  };
};

export const fetchAddSongToQueue = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addSong(data));
    return data;
  }
};

export const fetchPlaySong = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(playSong(data));
    return data;
  }
};

export const fetchAddQueue = (queue) => async (dispatch) => {};

const initialState = [];

const queueReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_SONG:
      newState = [...state];
      newState.push(action.payload);
      return newState;
    case PLAY_SONG:
      newState = [...state];
      newState.unshift(action.payload);
      return newState;
    case CLEAR_QUEUE:
      return [];
    case ADD_QUEUE:
      newState = action.payload;
      return newState;
    case DELETE_SONG:
      newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].id === action.payload) {
          newState.splice(i, 1);
          break;
        }
      }
      return newState;
    // case EDIT_SONG:
    //   newState = Object.assign({}, state);
    //   newState = action.payload;
    //   return newState;
    // case DELETE_SONG:
    //   newState = {};
    //   return newState;
    default:
      return state;
  }
};

export default queueReducer;
