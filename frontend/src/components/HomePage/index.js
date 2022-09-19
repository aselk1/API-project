
import { Switch, Route } from "react-router-dom";
import Navigation from "../Navigation";
import SignupFormPage from "../SignupFormPage";

function HomePage({isLoaded}) {
  return (
    <div>
      <Navigation isLoaded={isLoaded} />
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

export default HomePage;
