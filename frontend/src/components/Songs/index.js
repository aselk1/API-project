import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songsActions from "../../store/songs";
import './Songs.css'

function Songs() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs)
    const songsArray = Object.values(songs);
    useEffect(() => {
       dispatch(songsActions.fetchAllSongs());
    },[dispatch]);

  return (
  <div>
    <div>
    <h2>Songs</h2>
    <ul id='songsList'>
    {songsArray.map((el) => (
        <li className='songs'>
            <div>
                {el.title}
            </div>
            <div>
                {el.imageUrl}
            </div>
            <div>
                {el.url}
            </div>
        </li>
    ))}
    </ul>
    </div>
  </div>
  )
}

export default Songs;
