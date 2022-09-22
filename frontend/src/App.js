import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import Navigation from "./components/Navigation";
import Profile from "./components/ProfilePage";
import SongDetails from './components/SongDetails'
import * as sessionActions from "./store/session";
import * as songDetailsActions from './store/songDetails';
import Home from "./components/HomePage";
import "react-h5-audio-player/lib/styles.css";

function App() {
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //async with .then chains
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <div>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home isLoaded={isLoaded} />
          </Route>
          <Route path="/profile">
            <Profile isLoaded={isLoaded} />
          </Route>
          <Route>404 Page Not Found</Route>
        </Switch>
      )}
      <div className="audioPlayerContainer">
        <AudioPlayer
          src={state.songDetails.url}
          className="audioPlayer"
          // controlsList="nodownload"
          // controls
        />
      </div>
    </div>
  );
}

export default App;
