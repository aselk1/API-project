import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as songsActions from "../../store/songs";
import SongDetails from "../SongDetails";
import './Songs.css'

function Songs({isLoaded}) {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs)
    const songsArray = Object.values(songs);
    useEffect(() => {
       dispatch(songsActions.fetchAllSongs());
    },[dispatch]);

  return (
    <div>
      <div>
        <h2>Songs</h2>
        <ul id="songsList">
          {songsArray.map((el) => (
            <li className="songs" key={el.id}>
              <div>{el.title}</div>
              <div>{el.imageUrl}</div>
              <div>{el.url}</div>
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
