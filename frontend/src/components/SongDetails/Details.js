import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as songDetailsActions from '../../store/songDetails';
import './Details.css'


function Details() {
    const song = useSelector((state) => state.songDetails);
    console.log(song)
    if (!song.id) return <Redirect to='/profile'/>
    const {id, title, description, imageUrl, url, userId, Album, Artist, albumId } = song

    return (
      <div>
        <div id="songDetails">
          <h2>Song Details</h2>
          <button className="button" id="delete">
            <i className="fa-duotone fa-x"></i>
          </button>
        </div>
        <ul>
          <li>{id}</li>
          <li>{title}</li>
          <li>{description}</li>
          <li>{imageUrl}</li>
          <li>{url}</li>
          <li>{userId}</li>
          <li>{Album && Album.title}</li>
          <li>{Artist.username}</li>
        </ul>
      </div>
    );
}
export default Details
