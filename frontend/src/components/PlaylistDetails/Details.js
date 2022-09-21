import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import EditSongFormModal from "../EditSongFormModal";
import './Details.css'


function Details() {
    const dispatch = useDispatch();
    const history = useHistory();
    const playlist = useSelector((state) => state.playlistDetails);
    if (!playlist.id) return <Redirect to='/profile'/>
    const {id, title, description, imageUrl, url, userId, Album, Artist, albumId } = playlist;
    const songs = playlist.Songs;

    // const deleteSong = async (id) => {
    //     await dispatch(songActions.fetchDeleteSong(id))
    //     return history.push('/profile')
    // }



    return (
      <div>
        <div id="songDetails">
          <h2>Playlist Details</h2>
          <button className="button" id="delete">
            <i className="fa-duotone fa-x"></i>
          </button>
          <EditSongFormModal />
        </div>
        <ul>
          {songs.map((el) => (
            <li>{el.title}</li>
          ))}
          {/* <li>{title}</li>
          <li>{description}</li>
          <li>{imageUrl}</li>
          <li>{url}</li>
          <li>{userId}</li> */}
          {/* <li>{Album && Album.title}</li>
          <li>{Artist && Artist.username}</li> */}
        </ul>
      </div>
    );
}
export default Details
