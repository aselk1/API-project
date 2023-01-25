import { csrfFetch } from "./csrf";

const ADD_SONG = "/queue/addSong";
const PLAY_SONG = "/queue/playSong";
const CLEAR_QUEUE = "/queue/clear";
const ADD_QUEUE = "/queue/add";
const DELETE_SONG = "/queue/deleteSong";
const EDIT_SONG = "queue/editSong";

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

export const deleteSongFromQueue = (queueId) => {
  return {
    type: DELETE_SONG,
    payload: queueId,
  };
};

export const editSong = (song) => {
  return {
    type: EDIT_SONG,
    payload: song,
  };
};

export const fetchAddSongToQueue = (songId, queue) => async (dispatch) => {
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

export const fetchEditSong = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(editSong(data));
    return data;
  }
};

// export const fetchDeleteSong

const initialState = [];

const queueReducer = (state = initialState, action) => {
  let newState;
  let i;
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
      newState.splice(action.payload, 1);
      return newState;
    case EDIT_SONG:
      newState = [...state];
      i = 0;
      while (i < newState.length) {
        if (newState[i].id === action.payload.id) {
          newState[i] = action.payload;
        }
        i++;
      }
      return newState;
    // case DELETE_SONG:
    //   newState = {};
    //   return newState;
    default:
      return state;
  }
};

export default queueReducer;
