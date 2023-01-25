import { useEffect, useRef, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import queuePhoto from '../../images/queue.png'

import Queue from "./Queue";

import * as queueActions from "../../store/queue";
import "./AudioPlayer.css";

function SongPlayer() {
  const dispatch = useDispatch();
  const songDetails = useSelector((state) => state.songDetails);
  const currentQueue = useSelector((state) => state.queue);
  const [currentSong, setCurrentSong] = useState(0);
  // const [playingSong, setPlayingSong] = useState(currentQueue[currentSong].url);
  const [showQueue, setShowQueue] = useState(false);
  let playingSong;
  console.log('reset')
  if (currentQueue[currentSong]) {
    playingSong = currentQueue[currentSong].url;
  }

  const player = useRef();

  const openQueue = async () => {
    if (!showQueue) {
      await setShowQueue(true);
    }
    else await setShowQueue(false);
  };
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

  return (
    <div className="audioPlayer">
      {showQueue && (
        <Queue setShowQueue={setShowQueue} currentQueue={currentQueue} currentSong={currentSong} setCurrentSong={setCurrentSong} />
      )}
      <AudioPlayer
        src={playingSong}
        ref={player}
        autoPlayAfterSrcChange={false}
        autoPlay={true}
        showSkipControls
        customAdditionalControls={[
          <button className="queueButton" onClick={openQueue}>
            {/* <i className="fa-solid fa-music"></i> */}
            <img className="queuePhoto" src={queuePhoto}></img>
          </button>,
          RHAP_UI.LOOP,
        ]}
        onClickNext={async () => {
          if (currentQueue.length > currentSong + 1) {
            await setCurrentSong(currentSong + 1);
            player.current.audio.current.play();
          }
        }}
        onClickPrevious={async () => {
          if (currentSong > 0) {
            await setCurrentSong(currentSong - 1);
            player.current.audio.current.play();
          }
        }}
        onEnded={async () => {
          if (currentQueue.length > currentSong + 1) {
            await setCurrentSong(currentSong + 1);
            player.current.audio.current.play();
          }
        }}
      />
    </div>
  );
}

export default SongPlayer;
