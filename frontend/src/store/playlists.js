import { csrfFetch } from "./csrf";

const GET_PLAYLISTS = "/playlists/getPlaylists";


const getPlaylists = (playlists) => {
  return {
    type: GET_PLAYLISTS,
    payload: playlists,
  };
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

const initialState = {};

const playlistsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_PLAYLISTS:
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

export default playlistsReducer;
