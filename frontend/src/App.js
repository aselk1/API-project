import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";


function App() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    //async with .then chains
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route exact path="/">
          <div>Welcome Page</div>
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    )}
    </div>
  );
}

export default App;
