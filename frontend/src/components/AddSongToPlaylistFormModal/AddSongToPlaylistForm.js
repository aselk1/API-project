import React, { useState } from "react";
import * as playlistDetailsActions from "../../store/playlistDetails";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import "./AddSongToPlaylistForm.css";

function AddSongToPlaylistForm({ setShowModal, songId }) {
  const dispatch = useDispatch();
  const currentPlaylist =  Number(useLocation().pathname.split('/')[3])
  // const playlist = useSelector((state) => state.playlistDetails);
  const playlists = Object.values(useSelector((state) => state.playlists));
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (playlistId) => {
    // e.preventDefault();
    setShowModal(false);
    //reset errors array
    setErrors([]);
    //return dispatch of addSong thunk
    return (
      dispatch(
        playlistDetailsActions.fetchAddSong(
          songId
        , playlistId, currentPlaylist)
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
      <div className="signIn">
        <h2>Choose Playlist</h2>
        <ul>
          {errors.map((error, idx) => {
            return <li key={idx}>{error}</li>;
          })}
        </ul>
        <div className="choosePlaylist">
          <ul className='choosePlaylistList'>
            {playlists.map((el) => (
              <button
                className="choosePlaylistContainer"
                onClick={() => handleSubmit(el.id)}
                key={el.id}
              >
                {el.name}
              </button>
            ))}
          </ul>
        </div>
        {/* <label>
          <input
            placeholder="Song Id"
            type="text"
            value={songId}
            onChange={(e) => setSongId(e.target.value)}
            required
          />
        </label> */}
        {/* <button type="submit" className="submit">
          Add Song to Playlist
        </button> */}
      </div>
    </div>
  );
}

export default AddSongToPlaylistForm;
