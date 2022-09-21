import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import Navigation from "./components/Navigation";
import Profile from "./components/ProfilePage";
import SongDetails from './components/SongDetails'
import * as sessionActions from "./store/session";
import Home from "./components/HomePage";

function App() {
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
          {/* <Route exact path="/profile/songDetails">
            <SongDetails isLoaded={isLoaded} />
          </Route> */}
          <Route>404 Page Not Found</Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
