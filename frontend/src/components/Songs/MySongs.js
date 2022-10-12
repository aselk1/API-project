import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import * as songsActions from "../../store/songs";
import * as songDetailsActions from "../../store/songDetails";
import * as currentSongActions from '../../store/currentSong';
import AddSongFormModal from "../AddSongFormModal";
import AddSongToPlaylistFormModal from "../AddSongToPlaylistFormModal";
import SongDetails from "../SongDetails";

import "./Songs.css";

function UserSongs({ isLoaded }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const songsArray = Object.values(songs);
  const id = Number(user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(songsActions.fetchUserSongs(id));
  }, [dispatch, id]);

  const songDetails = async (id) => {
    await dispatch(currentSongActions.fetchCurrentSong(id));
    history.push(`/profile/songDetails/${id}`);
  };

  const playSong = async (id) => {
    await dispatch(songDetailsActions.fetchSongDetails(id));
  };

  return (
    <div>
      <div>
        <div id="mySongs">
          <h2 className="pageTitle">My Songs</h2>
          <AddSongFormModal />
        </div>
        <ul id="songsList">
          {songsArray.map((el) => (
            <li className="songs" key={el.id}>
              <div className="outerContainer">
                <div className="addContainer2">
                  <AddSongToPlaylistFormModal songId={el.id} />
                  <i
                    className="fa-solid fa-circle-info"
                    onClick={() => songDetails(el.id)}
                  ></i>
                </div>
                <img src={el.imageUrl}></img>
                <div className="overlay" onClick={() => playSong(el.id)}>
                  <i className="fa-sharp fa-solid fa-circle-play"></i>
                </div>
              </div>
              <div>{el.title}</div>
              {/* <div>{el.imageUrl}</div>
              <div>{el.url}</div> */}
            </li>
          ))}
        </ul>
      </div>
      {isLoaded && <Switch></Switch>}
    </div>
  );
}

export default UserSongs;
