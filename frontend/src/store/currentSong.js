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

export const fetchEditCurrentSong = (song, id) => async (dispatch) => {
  const { title, description, imageUrl, oldUrl } = song;
  const formData = new FormData();
  if (song.file != null) {
    const { file } = song;
    formData.append("url", file);
  } else {
    formData.append("url", oldUrl);
  }
  formData.append("title", title);
  formData.append("description", description);
  formData.append("imageUrl", imageUrl);
  const response = await csrfFetch(`/api/songs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  if (response.ok) {
    dispatch(fetchCurrentSong(id));
    // const data = await response.json();
    // dispatch(editSong(data));
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
