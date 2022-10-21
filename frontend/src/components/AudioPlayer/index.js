import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";

import * as queueActions from "../../store/queue";

function SongPlayer() {
  const dispatch = useDispatch();
  const songDetails = useSelector((state) => state.songDetails);
  const currentQueue = useSelector((state) => state.queue);
  const [currentSong, setCurrentSong] = useState(0);
  let playingSong;
  if (currentQueue[currentSong]) {
    playingSong = currentQueue[currentSong].url;
  }
  // const playlist = useSelector((state) => state.playlistDetails.Songs)

  const player = useRef();
  if (!songDetails.id) {
    if (player.current) player.current.audio.current.pause();
  }

  // useEffect(() => {
  //   if (songDetails.id) {
  //     dispatch(queueActions.fetchPlaySong(songDetails.id))
  //   }
  // },[songDetails, dispatch])

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
    <AudioPlayer
      src={playingSong}
      className="audioPlayer"
      ref={player}
      showSkipControls
      onClickNext={() => {
        // console.log(currentQueue.length === currentSong);
        if (currentQueue.length !== currentSong + 1) setCurrentSong(currentSong + 1);
        // setCurrentSong(currentSong + 1);
      }}
      onClickPrevious={() => {
        if (currentSong > 0) setCurrentSong(currentSong - 1);
        // setCurrentSong(currentSong - 1);
      }}
    />
  );
}

export default SongPlayer;
