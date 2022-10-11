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
  const [url, setUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(song.imageUrl);
  const [album, setAlbum] = useState(song.albumId ? song.albumId : '');
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

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if(file.size/1000000 <= 5) setUrl(file);
      else {
        e.target.value = ('')
        alert ("File size must be 5MB or less.")
        return false
      }
    }
  };

  return (
    <div className="formContainer">
      <button onClick={() => setShowModal(false)} className="close">
        <i className="fa-duotone fa-x"></i>
      </button>
      <form onSubmit={handleSubmit} className="signIn">
        <h2>Edit Song</h2>
        <ul>
          {errors.map((error, idx) => {
            return <li key={idx}>{error}</li>;
          })}
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
        {/* <label>
          <input
            placeholder="Song URL"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label> */}
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
        <label>
          <input
            // placeholder="Drag Song Here"
            type="file"
            // value={url}
            onChange={updateFile}
            required
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
