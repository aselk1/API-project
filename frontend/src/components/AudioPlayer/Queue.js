import { useEffect, useRef, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import logo from '../../images/blackLogo.png';
import * as queueActions from "../../store/queue";

function Queue({ setShowQueue, currentQueue }) {
  const dispatch = useDispatch();
  const deleteSong = async (queueId) => {
    console.log("working")
    let queue = await JSON.parse(localStorage.getItem("queue"));
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].queueId === queueId) {
        queue.splice(i, 1);
        for (let j = i; j < queue.length; j++) {
          queue[j].queueId = queue[j].queueId - 1
        }
        break;
      }
    }
    localStorage.setItem("queue", JSON.stringify(queue));
    await dispatch(queueActions.deleteSongFromQueue(queueId))
  }

  return (
    <div className="queuePopup">
      <div className="queueTitle flexRow flexSpread">
        My Queue
        <img src={logo} className = "queueLogo"></img>
      </div>
      <div className="overflow queueSongs">
      {currentQueue.map((song) => (
        <div className="flexRow flexSpread bottomBorder">
          <div className="queueSong">{song.title}</div>
          <i
            className="fa-duotone fa-x"
            id="queue"
            onClick={() => deleteSong(song.queueId)}
          ></i>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Queue;
