import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as songsActions from "../../store/songs";
import * as songDetailsActions from '../../store/songDetails';
import SongDetails from "../SongDetails";
import './Songs.css'

function Songs({isLoaded}) {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs)
    const songsArray = Object.values(songs);
    useEffect(() => {
       dispatch(songsActions.fetchAllSongs());
    },[dispatch]);

    const playSong = async (id) => {
      await dispatch(songDetailsActions.fetchSongDetails(id))
    }

  return (
    <div>
      <div>
        <h2>Songs</h2>
        <ul id="songsList">
          {songsArray.map((el) => (
            <li className="songs" key={el.id} onClick={() => playSong(el.id)}>
              <img src={el.imageUrl} />
              <div>{el.title}</div>
              {/* <div>{el.imageUrl}</div>
              <div>{el.url}</div> */}
            </li>
          ))}
        </ul>
      </div>
      {isLoaded && (
        <Switch>

        </Switch>
      )}
    </div>
  );
}

export default Songs;
