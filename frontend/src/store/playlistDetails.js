import { csrfFetch } from "./csrf";

const GET_PLAYLIST = "/playlistDetails/getPlaylist";
const EDIT_PLAYLIST = "/playlists/editPlaylist";
const ADD_SONG = '/playlists/addSong';

const getPlaylist = (playlist) => {
  return {
    type: GET_PLAYLIST,
    payload: playlist,
  };
};

const editPlaylist = (playlistObj) => {
  return {
    type: EDIT_PLAYLIST,
    payload: playlistObj,
  };
};

const addSong = (song) => {
  return{
    type: ADD_SONG,
    payload: song
  }
}

export const fetchPlaylistDetails = (playlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlistId}`);
  if (response.ok) {
    const data = await response.json();
    let songsObj = {};
    data.Songs.forEach((el) => {
      songsObj[el.id] = el
    })
    data.Songs = songsObj
    dispatch(getPlaylist(data));
    return response;
  }
};

export const fetchEditPlaylist = (playlist, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editPlaylist(data));
    return response;
  }
};

// export const fetchAddSong = (song, playlistId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/playlists/${playlistId}/songs`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(song),
//   });
//   if (response.ok) {
//     const details = await csrfFetch(`/api/playlists/${playlistId}`);
//     const data = await response.json();
//     dispatch(addSong(data));
//     return response;
//   }
// };

export const fetchAddSong = (song, playlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlistId}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  if (response.ok) {
    // const val = await fetchPlaylistDetails(playlistId)
    // const details = await csrfFetch(`/api/playlists/${playlistId}`);
    // const data = await response.json();
    // dispatch(addSong(data));
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
    case EDIT_PLAYLIST:
      newState = Object.assign({}, state);
      newState = action.payload;
      newState.Songs = state.Songs
      return newState;
    case ADD_SONG:
      newState = Object.assign({}, state);
      newState.Songs[action.payload.songId] = action.payload
      return newState
    default:
      return state;
  }
};

export default playlistDetailsReducer;
