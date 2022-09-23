import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as songsActions from "../../store/songs";
import * as songDetailsActions from "../../store/songDetails";
import SongDetails from "../SongDetails";
import AddSongToPlaylistFormModal from "../AddSongToPlaylistFormModal";
import "./Songs.css";

function Songs({ isLoaded }) {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);
  const user = useSelector((state) => state.session.user);
  const songsArray = Object.values(songs);

  useEffect(() => {
    dispatch(songsActions.fetchAllSongs());
  }, [dispatch]);

  const playSong = async (id) => {
    await dispatch(songDetailsActions.fetchSongDetails(id));
  };

  return (
    <div>
      <div>
        <h2>Songs</h2>
        <ul id="songsList">
          {songsArray.map((el) => (
            <li className="songs" key={el.id}>
              <div className="outerContainer">
                {user && <AddSongToPlaylistFormModal songId={el.id} />}
                <img
                  className="songImage"
                  src={el.imageUrl}
                  onClick={() => playSong(el.id)}
                />
              </div>
              <div>{el.title}</div>
              {/* <div>{el.imageUrl}</div>
              <div>{el.url}</div> */}
            </li>
          ))}
        </ul>
      </div>
      {isLoaded && <Switch></Switch>}
    </div>
  );
}

export default Songs;
