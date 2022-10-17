import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import Navigation from "./components/Navigation";
import Profile from "./components/ProfilePage";
import SongDetails from './components/SongDetails'
import SongPlayer from "./components/AudioPlayer";
import * as sessionActions from "./store/session";
import * as songDetailsActions from './store/songDetails';
import Home from "./components/HomePage";
import "react-h5-audio-player/lib/styles.css";

function App() {
  const user = useSelector((state) => state.session.user)
  // const pageUrl = useLocation().pathname;
  // let songs;
  // if (state.playlistDetails.Songs) {
  //   songs = Object.values(state.playlistDetails.Songs).map((el) => {
  //     return el.url
  //   })
  // }
  // const [song, setSong] = useState(0)
  // let play;

  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);


  // if (pageUrl === '/profile/playlistDetails') {
  //   play = songs[song]
  // } else play = state.songDetails.url

  // const next = () => setSong(song+1)
  // const prev = () => setSong(song - 1);

  useEffect(() => {
    //async with .then chains
    dispatch(sessionActions.restoreUser())
    .then(() => {
      if (user) setIsLoaded(true)
    });
  }, [dispatch]);

  useEffect(() => {
    if (user) setIsLoaded(true);
    else setIsLoaded(false);
  }, [dispatch, user]);




  return (
    <div>
      {/* <Navigation isLoaded={isLoaded} /> */}
        <Switch>
          <Route exact path="/">
            <Home isLoaded={isLoaded} />
          </Route>
          <Route path="/profile">
            <Profile isLoaded={isLoaded} />
          </Route>
          <Route>404 Page Not Found</Route>
        </Switch>
      <div className="audioPlayerContainer">
        {/* <AudioPlayer
          src={state.songDetails.url}
          className="audioPlayer"
          // showSkipControls
          // onClickNext={next}
          // onClickPrevious={prev}
        /> */}
        <SongPlayer />
      </div>
    </div>
  );
}

export default App;
