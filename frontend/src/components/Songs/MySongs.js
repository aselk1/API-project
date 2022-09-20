import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as songsActions from "../../store/songs";

function UserSongs() {
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const songsArray = Object.values(songs);
  const id = Number(user.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(songsActions.fetchUserSongs(id));
  }, [dispatch]);

  return (
    <div>
      <div>
        <div id='mySongs'>
          <h2>My Songs</h2>
          <button>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <ul id="songsList">
          {songsArray.map((el) => (
            <li className="songs">
              <div>{el.title}</div>
              <div>{el.imageUrl}</div>
              <div>{el.url}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserSongs;
