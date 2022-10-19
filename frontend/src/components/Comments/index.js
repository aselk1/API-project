import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddComment, fetchComments, fetchDeleteComment } from "../../store/comments";
import "./Comments.css";

function Comments({isLoaded}) {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user);
  const currentSong = useSelector((state) => state.currentSong)
  const [newComment, setNewComment] = useState("");
  const commentsArray = Object.values(comments);
  let sessionId;
  if (user) {
    sessionId = user.id;
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log(newComment)
    if (newComment) {
      await dispatch(fetchAddComment(currentSong.id, newComment))
    }
    setNewComment("");
  }

  const deleteComment = async (commentId) => {
    await dispatch(fetchDeleteComment(currentSong.id, commentId))
  }

  return (
    <div>
      {isLoaded && (
        <div className="createComment">
          <img
            className="profilePhotoSquare"
            src={user?.imageUrl}
            alt="Profile"
          ></img>
          <form onSubmit={submit}>
            <input
              className="inputComment"
              type="text"
              placeholder="Write a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></input>
          </form>
        </div>
      )}
      <div className="commentsTitle">comments</div>
      <ul className="commentsList">
        {commentsArray.map((el) => (
          <li className="commentContainer" key={el.id}>
            <img
              className="profilePhoto"
              src={el.User.imageUrl}
              alt="Profile Img"
            ></img>
            <div className="commentContainer2">
              <div className="commentUser">{el.User.username}</div>
              <div className="comment">{el.body}</div>
            </div>
            <div className='commentButtons'>
              {sessionId === el.userId && (
                <button
                  className="button"
                  id="delete2"
                  onClick={() => deleteComment(el.id)}
                >
                  <i className="fa-duotone fa-x" id='deleteComment'></i>
                </button>
              )}
              {sessionId === el.userId}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
