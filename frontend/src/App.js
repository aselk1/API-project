import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);

  const login = () => {
    history.push('/login')
  }

  useEffect(() => {
    //async with .then chains
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <Switch>
        <Route exact path="/">
          <div>Welcome Page</div>
          <button onClick={login}>Login</button>
          <div>Query for stuff</div>
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    )
  );
}

export default App;
