import { csrfFetch } from "./csrf";

const GET_PLAYLIST = "/playlistDetails/getPlaylist";
const EDIT_PLAYLIST = "/playlists/editPlaylist";

const getPlaylist = (playlist) => {
  return {
    type: GET_PLAYLIST,
    payload: playlist,
  };
};

const editPlaylist = (songObj) => {
  return {
    type: EDIT_PLAYLIST,
    payload: songObj,
  };
};

export const fetchPlaylistDetails = (playlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlistId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getPlaylist(data));
    return response;
  }
};

export const fetchEditPlaylist = (song, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editPlaylist(data));
    return response;
  }
};

const initialState = {};

const playlistDetailsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PLAYLIST:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    // case EDIT_SONG:
    //   newState = Object.assign({}, state);
    //   newState = action.payload;
    //   return newState;
    default:
      return state;
  }
};

export default playlistDetailsReducer;
