import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import Songs from "../Songs";
import UserSongs from "../Songs/MySongs";
import SongDetails from "../SongDetails";
import Playlists from "../Playlists";

function Profile({ isLoaded, id }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("/");

  if (!sessionUser) return <Redirect to="/" />;

  let songs;
  let playlists;
  if (path[2] === "songDetails") {
    songs = <SongDetails isLoaded={isLoaded} id={id} />;
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
