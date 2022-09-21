import React, { useState } from "react";
import * as playlistsActions from "../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./AddPlaylistForm.css";

function AddPlaylistForm({setShowModal}) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
      //reset errors array
      setErrors([]);
      //return dispatch of addSong thunk
      return (
        dispatch(
          playlistsActions.fetchAddPlaylist({
            name,
            imageUrl,
          })
        )
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
        <h2>Add a New Playlist</h2>
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
          Add Playlist
        </button>
      </form>
    </div>
  );
}

export default AddPlaylistForm;
