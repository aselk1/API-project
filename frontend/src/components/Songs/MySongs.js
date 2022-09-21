import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import * as songsActions from "../../store/songs";
import * as songDetailsActions from '../../store/songDetails';
import AddSongFormModal from "../AddSongFormModal";
import SongDetails from "../SongDetails";

import './Songs.css'

function UserSongs({isLoaded}) {
  const history = useHistory()
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const songsArray = Object.values(songs);
  const id = Number(user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(songsActions.fetchUserSongs(id));
  }, [dispatch, id]);

  const songDetails = async (id) => {
    await dispatch(songDetailsActions.fetchSongDetails(id))
    history.push(`/profile/songDetails`)
  };

  return (
    <div>
      <div>
        <div id="mySongs">
          <h2>My Songs</h2>
          <AddSongFormModal />
        </div>
        <ul id="songsList">
          {songsArray.map((el) => (
            <li className="songs" onClick={() => songDetails(el.id)} key={el.id}>
              <div>{el.title}</div>
              <div>{el.imageUrl}</div>
              <div>{el.url}</div>
            </li>
          ))}
        </ul>
      </div>
      {isLoaded && (
        <Switch>

        </Switch>
      )}
    </div>
  );
}

export default UserSongs;
