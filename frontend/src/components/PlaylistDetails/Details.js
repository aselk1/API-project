import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import EditPlaylistFormModal from "../EditPlaylistFormModal";
import "./Details.css";
import * as playlistsActions from "../../store/playlists";
import * as songDetailsActions from "../../store/songDetails";
import * as currentSongActions from "../../store/currentSong";
import * as commentsActions from "../../store/comments";
import * as playlistDetailsActions from "../../store/playlistDetails";
import AddSongToPlaylistFormModal from "../AddSongToPlaylistFormModal";
import * as queueActions from "../../store/queue";

function Details({isLoaded}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const playlist = useSelector((state) => state.playlistDetails);
  const playlistId = Number(useLocation().pathname.split('/')[3])
  let songs;
  // if (!playlist.id) return <Redirect to="/profile" />;
  const {
    id,
    title,
    description,
    imageUrl,
    url,
    userId,
    Album,
    Artist,
    albumId,
  } = playlist;

  if (playlist.Songs) songs = Object.values(playlist.Songs);

  const deletePlaylist = async (id) => {
    await dispatch(playlistsActions.fetchDeletePlaylist(id));
    return history.push("/profile");
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
  const songDetails = async (id) => {
    await dispatch(currentSongActions.fetchCurrentSong(id));
    await dispatch(commentsActions.fetchComments(id));
    history.push(`/profile/songDetails/${id}`);
  };

  useEffect( () => {
    dispatch(playlistDetailsActions.fetchPlaylistDetails(playlistId));
    dispatch(playlistsActions.fetchUserPlaylists());
  },[dispatch, playlistId])

  return (
    <div>
      <div id="songDetails">
        <h2 className="pageTitle">Playlist Details</h2>
        <button
          className="button"
          id="delete"
          onClick={() => deletePlaylist(playlist.id)}
        >
          <i className="fa-duotone fa-x"></i>
        </button>
        <EditPlaylistFormModal />
      </div>
      <div id="songDetails">
        <h3 className="pageTitle">{playlist.name}</h3>
      </div>
      <ul id="songsList">
        {songs?.map((el) => (
          <li className="songs" key={el.id}>
            <div className="outerContainer">
              <div className={isLoaded ? "addContainer2" : "addContainer3"}>
                {user && <AddSongToPlaylistFormModal songId={el.id} />}
                <i
                  className="fa-solid fa-circle-info"
                  onClick={() => songDetails(el.id)}
                ></i>
              </div>
              <img
                className="songImage"
                src={el.imageUrl}
                onClick={() => playSong(el.id)}
              />
              <div className="overlay" onClick={() => playSong(el.id)}>
                <i className="fa-sharp fa-solid fa-circle-play"></i>
              </div>
            </div>
            <div>{el.title}</div>
          </li>
        ))}
        {/* <li>{title}</li>
          <li>{description}</li>
          <li>{imageUrl}</li>
          <li>{url}</li>
          <li>{userId}</li> */}
        {/* <li>{Album && Album.title}</li>
          <li>{Artist && Artist.username}</li> */}
      </ul>
    </div>
  );
}
export default Details;
