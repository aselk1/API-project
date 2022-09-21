import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Switch } from 'react-router-dom';

import * as playlistsActions from '../../store/playlists'



function Playlists({ isLoaded }) {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists);
  const playlistsArray = Object.values(playlists);
  useEffect(() => {
    dispatch(playlistsActions.fetchUserPlaylists());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h2>Playlists</h2>
        <ul id="songsList">
          {playlistsArray.map((el) => (
            <li className="songs" key={el.id}>
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

export default Playlists
