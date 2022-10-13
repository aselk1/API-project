import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as songsActions from "../../store/songs";
import * as songDetailsActions from "../../store/songDetails";
import * as currentSongActions from '../../store/currentSong';
import SongDetails from "../SongDetails";
import AddSongToPlaylistFormModal from "../AddSongToPlaylistFormModal";
import "./Songs.css";

function Songs({ isLoaded }) {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);
  const user = useSelector((state) => state.session.user);
  const songsArray = Object.values(songs);
  const history = useHistory();

  useEffect(() => {
    dispatch(songsActions.fetchAllSongs());
  }, [dispatch]);

  const songDetails = async (id) => {
    await dispatch(currentSongActions.fetchCurrentSong(id));
    history.push(`/profile/songDetails/${id}`);
  };

  const playSong = async (id) => {
    await dispatch(songDetailsActions.fetchSongDetails(id));
  };

  return (
    <div>
      <div>
        <h2 className="pageTitle">Songs</h2>
        <ul id="songsList">
          {songsArray.map((el) => (
            <li className="songs" key={el.id}>
              <div className="outerContainer">
                <div className={isLoaded? "addContainer2" : "addContainer3"}>
                  {user && <AddSongToPlaylistFormModal songId={el.id} />}
                  <i
                    className="fa-solid fa-circle-info"
                    onClick={() => songDetails(el.id)}
                  ></i>
                </div>
                <img
                  className="songImage"
                  alt={el.name}
                  src={el.imageUrl}
                  onClick={() => playSong(el.id)}
                />

                <div className="overlay" onClick={() => playSong(el.id)}>
                  <i className="fa-sharp fa-solid fa-circle-play"></i>
                </div>
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
