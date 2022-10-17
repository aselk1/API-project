import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import * as songActions from '../../store/songs';
import * as songDetailsActions from '../../store/songDetails';
import * as currentSongActions from "../../store/currentSong";
import * as commentsActions from '../../store/comments';
import EditSongFormModal from "../EditSongFormModal";
import './Details.css'


function Details({id2}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const song = useSelector((state) => state.currentSong);
    const user = useSelector((state) => state.session.user)
    let sessionId;
    if (user) {
      sessionId = user.id
    }
    const urlId = Number(useLocation().pathname.split('/')[3]);



    useEffect(() => {
      dispatch(currentSongActions.fetchCurrentSong(urlId));
      dispatch(commentsActions.fetchComments(urlId));
    }, [dispatch, urlId]);

    // if (!song.id) return <Redirect to='/profile'/>
    const {id, title, description, imageUrl, url, userId, Album, Artist, albumId } = song;

    const deleteSong = async (id) => {
        await dispatch(songActions.fetchDeleteSong(id));
        if (id === song.id) await dispatch(songDetailsActions.deleteSong(id));
        return history.push('/profile')
    }

    return (
      <div className= 'detailsContainer'>
        <div id="songDetailsPage">
          <div>
          <h2 className="songTitle">{title}</h2>
          <h3 className='songArtist'>{Artist?.username}</h3>
          </div>
          {sessionId === userId && <button className="button" id="delete1" onClick={() => deleteSong(id)}>
            <i className="fa-duotone fa-x"></i>
          </button>}
          {sessionId === userId && <EditSongFormModal />}
        </div>
        <img className = 'songDetailsImage' src={imageUrl} alt={title}/>
      </div>
    );
}
export default Details
