import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import Songs from "../Songs";
import * as playlistsActions from '../../store/playlists';
import "./HomePage.css";

function Home({ isLoaded }) {
  const dispatch = useDispatch()
  const history = useHistory();
  const home = (e) => {
    e.preventDefault();
    history.push("/");
  };

  useEffect(()=> {
    dispatch(playlistsActions.fetchUserPlaylists());
  },[])

  return (
    <div className="extraContainer">
      <div className="bodyContainer">
      <div className="pageContainer">
      <div id='bar'></div>
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
        <Songs />
      </div>
      </div>
      {isLoaded && (
        <Switch>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
        </Switch>
      )}
    </div>
  );
}

export default Home;
