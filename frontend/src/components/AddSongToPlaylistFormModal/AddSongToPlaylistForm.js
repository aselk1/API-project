import React, { useState } from "react";
import * as playlistDetailsActions from "../../store/playlistDetails";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./AddSongToPlaylistForm.css";

function AddSongToPlaylistForm({ setShowModal, playlistId }) {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlistDetails);
  const [songId, setSongId] = useState("");
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
        playlistDetailsActions.fetchAddSong({
          songId
        }, playlist.id)
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
        <h2>Add Song to Playlist</h2>
        <ul>
          {errors.map((error, idx) => {
            return <li key={idx}>{error}</li>;
          })}
        </ul>
        <label>
          <input
            placeholder="Song Id"
            type="text"
            value={songId}
            onChange={(e) => setSongId(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="submit">
          Add Song to Playlist
        </button>
      </form>
    </div>
  );
}

export default AddSongToPlaylistForm;
