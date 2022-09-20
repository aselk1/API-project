import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import sessionReducer from "./session";
import songsDetailsReducer from "./songDetails";
import songsReducer from "./songs";

//combine all reducers
const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songsReducer,
  songDetails: songsDetailsReducer
});

//set up enhancer for production vs. development
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

//configure store function to be used in root index file
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
