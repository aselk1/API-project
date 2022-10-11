import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from "react-redux";

function SongPlayer() {
    const songDetails = useSelector((state) => state.songDetails);
    const player = useRef();
    if (!songDetails.id) {
        if (player.current) player.current.audio.current.pause();
    }
    return (
      <AudioPlayer
        src={songDetails.url}
        className="audioPlayer"
        ref={player}
        // showSkipControls
        // onClickNext={next}
        // onClickPrevious={prev}
      />
    );
}

export default SongPlayer
