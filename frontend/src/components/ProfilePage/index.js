import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Navigation from "../Navigation";
import Songs from "../Songs";
import UserSongs from "../Songs/MySongs";
import SongDetails from "../SongDetails";
import PlaylistDetails from '../PlaylistDetails'
import Playlists from "../Playlists";
import * as currentSongActions from '../../store/currentSong';

function Profile({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("/");
  const urlId = path[3]
  const songId = useSelector((state) => state.currentSong.id)
  const currentSong = useSelector((state) => state.currentSong)
  const dispatch = useDispatch();

  useEffect(() => {
    if (urlId !== 'undefined' && urlId !== undefined) dispatch(currentSongActions.fetchCurrentSong(Number(urlId)));
  }, [dispatch, urlId]);

  // if (!sessionUser) return <Redirect to={`/profile/songDetails/${songId}`} />;

  let songs;
  let playlists;
  if (path[2] === "songDetails") {
    songs = <SongDetails isLoaded={isLoaded} id={songId} />;
  } else if (path[2] === "playlistDetails") {
    playlists = <PlaylistDetails isLoaded={isLoaded}  />
  } else {
    songs = <UserSongs isLoaded={isLoaded}></UserSongs>;
    playlists = <Playlists isLoaded={isLoaded}></Playlists>
  }
  const home = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div className="extraContainer">
      <div className="bodyContainer">
        <div className="pageContainer">
          <div id="bar"></div>
          <div className="topBar">
            <div>
              <div className="logoContainer" onClick={home}>
                <img
                  className="logo"
                  src="https://d21buns5ku92am.cloudfront.net/26628/images/419679-1x1_SoundCloudLogo_cloudmark-f5912b-medium-1645807040.jpg"
                ></img>
                <div className="logoText">SHOUNDCLOUD</div>
              </div>
            </div>
            <div className="nav">
              <Navigation isLoaded={isLoaded} />
            </div>
          </div>
          {songs}
          {playlists}
        </div>
      </div>
      {isLoaded && <Switch></Switch>}
    </div>
  );
}

export default Profile;
