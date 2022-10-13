import { csrfFetch } from "./csrf";

const GET_PLAYLISTS = "/playlists/getPlaylists";
const ADD_PLAYLIST = '/playlists/addPlaylist';
const DELETE_PLAYLIST = "/playlists/deletePlaylist";


const getPlaylists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    payload: playlists,
  };
};
const addPlaylist = (playlist) => {
  return {
    type: ADD_PLAYLIST,
    payload: playlist,
  };
};

const deletePlaylist = (playlistId) => {
  return {
    type: DELETE_PLAYLIST,
    payload: playlistId,
  };
};

export const fetchDeletePlaylist = (playlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // const data = await response.json();
    dispatch(deletePlaylist(playlistId));
    return response;
  }
};


export const fetchUserPlaylists = () => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/current`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    const playlists = data.Playlists;
    const playlistsObj = {};
    playlists.forEach((el) => {
      playlistsObj[el.id] = el;
    });
    dispatch(getPlaylists(playlistsObj));
    return response;
  }
};

export const fetchAddPlaylist = (playlist) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addPlaylist(data));
    return response;
  }
};

const initialState = {};

const playlistsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PLAYLISTS:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case ADD_PLAYLIST:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_PLAYLIST:
      newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default playlistsReducer;
