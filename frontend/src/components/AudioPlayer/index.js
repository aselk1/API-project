import { useEffect, useRef, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";

import * as queueActions from "../../store/queue";
import './AudioPlayer.css'

function SongPlayer() {
  const dispatch = useDispatch();
  const songDetails = useSelector((state) => state.songDetails);
  const currentQueue = useSelector((state) => state.queue);
  const [currentSong, setCurrentSong] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  let playingSong;
  if (currentQueue[currentSong]) {
    playingSong = currentQueue[currentSong].url;
  }

  const player = useRef();
  if (!songDetails.id) {
    if (player.current) player.current.audio.current.pause();
  }

  const openQueue = async () => {
    console.log(showQueue)
    if (showQueue) return;
    await setShowQueue(true);
    console.log(showQueue)
  }
  useEffect(() => {
    const queue = JSON.parse(localStorage.getItem("queue"));
    if (queue) {
      (async function () {
        await dispatch(queueActions.clearQueue());
        await dispatch(queueActions.addQueue(queue));
      })();
      // (async function () {
      // })();
    }
  }, [dispatch]);

  useEffect(() => {
    //if menu is closed, return
    if (!showQueue) return;

    //if menu if open, close it
    const closeQueue = () => {
      setShowQueue(false);
    };

    //add event listener for closeMenu
    document.addEventListener("click", closeQueue);
    //clean up function to remove the event listener
    return () => document.removeEventListener("click", closeQueue);
  }, [showQueue]);

  return (
    <div className="audioPlayer">
      {showQueue && <div>Menu</div>}
      <AudioPlayer
        src={playingSong}
        ref={player}
        showSkipControls
        customAdditionalControls={[
          <button className="queueButton" onClick={openQueue}>
            <i className="fa-solid fa-music"></i>
          </button>,
          RHAP_UI.LOOP,
        ]}
        onClickNext={() => {
          if (currentQueue.length !== currentSong + 1)
            setCurrentSong(currentSong + 1);
        }}
        onClickPrevious={() => {
          if (currentSong > 0) setCurrentSong(currentSong - 1);
        }}
        onEnded={() => {
          if (currentQueue.length > currentSong + 1)
            setCurrentSong(currentSong + 1);
        }}
      />
    </div>
  );
}

export default SongPlayer;
