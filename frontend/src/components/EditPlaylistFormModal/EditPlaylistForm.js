import React, { useState } from "react";
import * as playlistDetailsActions from "../../store/playlistDetails";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./EditPlaylistForm.css";

function EditPlaylistForm({setShowModal}) {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlistDetails);
  const [name, setName] = useState(playlist.name);
  const [imageUrl, setImageUrl] = useState(playlist.imageUrl);
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
      //reset errors array
      setErrors([]);
      //return dispatch of addSong thunk
      const playlistObj = {name, imageUrl}
      return (
        dispatch(playlistDetailsActions.fetchEditPlaylist(playlistObj, playlist.id))
          //catch res and or errors
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(Object.values(data.errors));
            }
          })
      );
  };

  return (
    <div className="formContainer">
      <button onClick={() => setShowModal(false)} className="close">
        <i className="fa-duotone fa-x"></i>
      </button>
      <form onSubmit={handleSubmit} className="signIn">
        <h2>Edit Playlist</h2>
        <ul>
          {errors.map((error, idx) => {
          return (
            <li key={idx}>{error}</li>
          )})}
        </ul>
        <label>
          <input
            placeholder="Playlist Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Image URL"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            // required
          />
        </label>
        <button type="submit" className="submit">
          Edit Playlist
        </button>
      </form>
    </div>
  );
}

export default EditPlaylistForm;
