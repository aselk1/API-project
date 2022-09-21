import { csrfFetch } from "./csrf";

const GET_SONGS = '/songs/getSongs';
const ADD_SONG = 'songs/addSong'
const DELETE_SONG = '/songs/deleteSong'

const getSongs = (songsObj) => {
    return {
        type: GET_SONGS,
        payload: songsObj
    }
}

const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    payload: songId
  };
};

const addSong = (songObj) => {
  return {
    type: ADD_SONG,
    payload: songObj,
  };
};


export const fetchAllSongs = () => async (dispatch) => {
    const response = await csrfFetch("/api/songs", {
      method: "GET"
    });
    if (response.ok) {
      const data = await response.json();
      const songs = data.Songs
      const songsObj = {};
      songs.forEach((el) => {
          songsObj[el.id] = el
      })
      dispatch(getSongs(songsObj));
      return response;
    }
}

export const fetchDeleteSong = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSong(songId));
    return response;
  }
};

export const fetchUserSongs = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/current`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    const songs = data.Songs;
    const songsObj = {};
    songs.forEach((el) => {
      songsObj[el.id] = el;
    });
    dispatch(getSongs(songsObj));
    return response;
  }
};


export const fetchAddSong = (song) => async (dispatch) => {
  const response = await csrfFetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song)
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(addSong(data));
    return response
  }
}



const initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SONGS:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case ADD_SONG:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_SONG:
      newState = Object.assign({}, state);
      delete newState[action.payload]
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
