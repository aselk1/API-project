import { useEffect, useRef, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/orangeLogo.png";
import * as queueActions from "../../store/queue";

function Queue({ setShowQueue, currentQueue, currentSong, setCurrentSong }) {
  const dispatch = useDispatch();
  const deleteSong = async (queueId) => {
    let queue = await JSON.parse(localStorage.getItem("queue"));
    if (queueId === queue.length - 1) {
      setCurrentSong(currentSong - 1);
    } else if (queueId < currentSong) {
      setCurrentSong(currentSong - 1);
    }
    queue.splice(queueId, 1);
    localStorage.setItem("queue", JSON.stringify(queue));
    await dispatch(queueActions.deleteSongFromQueue(queueId));
  };

  return (
    <div className="queuePopup">
      <div className="queueTitle flexRow flexSpread orange">
        My Queue
        <img src={logo} className="queueLogo orange"></img>
      </div>
      <div className="overflow queueSongs">
        {currentQueue.map((song, i) => (
          <div className="flexRow flexSpread bottomBorder">
            {currentSong === i && (
              <div className="flexRow flexSpread">
                <div className="queueSong orange">{song.title}</div>
              </div>
            )}
            {currentSong !== i && (
              <div className="queueSong white">{song.title}</div>
            )}
            <div className="flexRow">
              {currentSong === i && (
                <div className="smallPlay">
                  <i class="fa-solid fa-play queuePlaying orange"></i>
                </div>
              )}
              <i
                className="fa-duotone fa-x white"
                id="queue"
                onClick={() => deleteSong(i)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Queue;
