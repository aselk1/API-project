import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Switch, useHistory } from "react-router-dom";

import * as playlistsActions from "../../store/playlists";
import * as playlistDetailsActions from "../../store/playlistDetails";
import AddPlaylistFormModal from "../AddPlaylistFormModal";

function Playlists({ isLoaded }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists);
  const playlistsArray = Object.values(playlists);
  useEffect(() => {
    dispatch(playlistsActions.fetchUserPlaylists());
  }, [dispatch]);

  const playlistDetails = async (id) => {
    await dispatch(playlistDetailsActions.fetchPlaylistDetails(id));
    history.push("/profile/playlistDetails");
  };

  return (
    <div>
      <div>
        <div id="mySongs">
        <h2>Playlists</h2>
        <AddPlaylistFormModal />
        </div>
        <ul id="songsList">
          {playlistsArray.map((el) => (
            <li
              className="songs"
              key={el.id}
              onClick={() => playlistDetails(el.id)}
            >
              <div>{el.name}</div>
              <div>{el.imageUrl}</div>
              <div>{el.userId}</div>
            </li>
          ))}
        </ul>
      </div>
      {isLoaded && <Switch></Switch>}
    </div>
  );
}

export default Playlists;
