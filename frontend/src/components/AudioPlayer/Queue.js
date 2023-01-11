import { useEffect, useRef, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
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
  // useEffect(() => {
  //   //if menu is closed, return
  //   // if (!showQueue) return;

  //   //if menu if open, close it
  //   const closeQueue = () => {
  //     setShowQueue(false);
  //   };

  //   //add event listener for closeMenu
  //   document.addEventListener("click", closeQueue);
  //   //clean up function to remove the event listener
  //   return () => document.removeEventListener("click", closeQueue);
  // }, [setShowQueue]);

  return (
    <div className="queuePopup">
      <div className="queueTitle">Queue</div>
      {currentQueue.map((song) => (
        <div className="flexRow flexSpread">
          <div className="queueSong">{song.title}</div>
          <i className="fa-duotone fa-x" id="queue" onClick={() => deleteSong(song.queueId)}></i>
        </div>
      ))}
    </div>
  );
}

export default Queue;
