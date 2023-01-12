import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import * as songsActions from "../../store/songs";
import * as songDetailsActions from "../../store/songDetails";
import * as currentSongActions from '../../store/currentSong';
import * as commentsActions from '../../store/comments';
import AddSongFormModal from "../AddSongFormModal";
import AddSongToPlaylistFormModal from "../AddSongToPlaylistFormModal";
import SongDetails from "../SongDetails";
import * as queueActions from "../../store/queue";

import "./Songs.css";

function UserSongs({ isLoaded }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const songsArray = Object.values(songs);
  let id;
  if (user) {
    id = Number(user.id);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(songsActions.fetchUserSongs(id));
  }, [dispatch, id]);

  const songDetails = async (id) => {
    await dispatch(currentSongActions.fetchCurrentSong(id));
    await dispatch(commentsActions.fetchComments(id));
    history.push(`/profile/songDetails/${id}`);
  };

  const playSong = async (id) => {
    const song = await dispatch(queueActions.fetchPlaySong(id));
    const queue = await JSON.parse(localStorage.getItem("queue"));
    if (queue) {
      song["queueId"] = 0;
      let i = 1;
      while (i < queue.length) {
        queue[i].queueId = queue[i].queueId + 1;
        i++;
      }
      queue.unshift(song);
      localStorage.setItem("queue", JSON.stringify(queue));
    } else {
      song["queueId"] = 0;
      localStorage.setItem("queue", JSON.stringify([song]));
    }
  };

  const addSongToQueue = async (id) => {
    const queue = await JSON.parse(localStorage.getItem("queue"));
    const song = await dispatch(queueActions.fetchAddSongToQueue(id, queue));
    if (queue) {
      song["queueId"] = queue.length;
      queue.push(song);
      localStorage.setItem("queue", JSON.stringify(queue));
    } else {
      song["queueId"] = 0;
      localStorage.setItem("queue", JSON.stringify([song]));
    }
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
                  <button onClick={() => addSongToQueue(el.id)}>
                    Add to Queue
                  </button>
                  <i
                    className="fa-solid fa-circle-info"
                    onClick={() => songDetails(el.id)}
                  ></i>
                </div>
                {/* <img src={el.imageUrl}></img> */}
                <img
                  className="songImage"
                  alt={el.name}
                  src={el.imageUrl}
                  onClick={() => playSong(el.id)}
                />
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
