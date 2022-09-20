import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as songActions from '../../store/songs';
import EditSongFormModal from "../EditSongFormModal";
import './Details.css'


function Details() {
    const dispatch = useDispatch();
    const history = useHistory();
    const song = useSelector((state) => state.songDetails);
    if (!song.id) return <Redirect to='/profile'/>
    const {id, title, description, imageUrl, url, userId, Album, Artist, albumId } = song;

    const deleteSong = async (id) => {
        await dispatch(songActions.fetchDeleteSong(id))
        return history.push('/profile')
    }



    return (
      <div>
        <div id="songDetails">
          <h2>Song Details</h2>
          <button className="button" id="delete" onClick={() => deleteSong(id)}>
            <i className="fa-duotone fa-x"></i>
          </button>
          <EditSongFormModal />
        </div>
        <ul>
          <li>{id}</li>
          <li>{title}</li>
          <li>{description}</li>
          <li>{imageUrl}</li>
          <li>{url}</li>
          <li>{userId}</li>
          {/* <li>{Album && Album.title}</li>
          <li>{Artist && Artist.username}</li> */}
        </ul>
      </div>
    );
}
export default Details
