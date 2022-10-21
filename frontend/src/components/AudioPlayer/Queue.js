import { useEffect, useRef, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";

function Queue() {
  const [showQueue, setShowQueue] = useState(false);
  const openQueue = async () => {
    if (showQueue) return;
    await setShowQueue(true);
  };

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

  return <div>Hi</div>;
}

export default Queue;
