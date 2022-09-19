import { Switch, Route } from "react-router-dom";
import Navigation from "../Navigation";
import SignupFormPage from "../SignupFormPage";

function HomePage({ isLoaded }) {
  return (
    <div>
      <div className="topBar"></div>
      <div>
        <div>
          <img
          className="logo"
          src="https://d21buns5ku92am.cloudfront.net/26628/images/419679-1x1_SoundCloudLogo_cloudmark-f5912b-medium-1645807040.jpg">
          </img>
        </div>
        <Navigation isLoaded={isLoaded} />
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

export default HomePage;
