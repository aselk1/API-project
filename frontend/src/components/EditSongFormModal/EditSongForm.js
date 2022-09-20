import React, { useState } from "react";
import * as songDetailsActions from "../../store/songDetails";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./EditSongForm.css";

function EditSongForm({setShowModal}) {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songDetails);
  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [imageUrl, setImageUrl] = useState(song.imageUrl);
  const [album, setAlbum] = useState(song.albumId);
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
      //reset errors array
      setErrors([]);
      //return dispatch of addSong thunk
      const songObj = {title, description, url, imageUrl}
      return (
        dispatch(songDetailsActions.fetchEditSong(songObj, song.id))
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
        <h2>Add a New Song</h2>
        <ul>
          {errors.map((error, idx) => {
          return (
            <li key={idx}>{error}</li>
          )})}
        </ul>
        <label>
          <input
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // required
          />
        </label>
        <label>
          <input
            placeholder="Song URL"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
        <label>
          <input
            placeholder="Album"
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            // required
          />
        </label>
        <button type="submit" className="submit">
          Edit Song
        </button>
      </form>
    </div>
  );
}

export default EditSongForm;
