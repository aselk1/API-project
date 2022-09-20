import { Switch, Route, useHistory } from "react-router-dom";
import Navigation from "../Navigation";
import Details from './Details'

function SongDetails({ isLoaded, id }) {

  const history = useHistory();
  const home = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div className="extraContainer">
      <div className="bodyContainer">
        <div className="pageContainer">
          {/* <div id="bar"></div> */}
          {/* <div className="topBar"> */}
            {/* <div>
              <div className="logoContainer" onClick={home}>
                <img
                  className="logo"
                  src="https://d21buns5ku92am.cloudfront.net/26628/images/419679-1x1_SoundCloudLogo_cloudmark-f5912b-medium-1645807040.jpg"
                ></img>
                <div className="logoText">SHOUNDCLOUD</div>
              </div>
            </div> */}
            {/* <div className="nav">
              <Navigation isLoaded={isLoaded} />
            </div> */}
          {/* </div> */}
          <Details id={id}/>
        </div>
      </div>
    </div>
  );
}

export default SongDetails;
