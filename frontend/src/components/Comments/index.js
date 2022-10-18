import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddComment } from "../../store/comments";
import "./Comments.css";

function Comments({isLoaded}) {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user);
  const currentSong = useSelector((state) => state.currentSong.id)
  const [newComment, setNewComment] = useState("");
  const commentsArray = Object.values(comments);

  const submit = async (e) => {
    e.preventDefault()
    console.log(newComment)
    if (newComment) {
      await dispatch(fetchAddComment(currentSong, newComment))
    }
    setNewComment("");
  }

  return (
    <div>
      {isLoaded && <div className="createComment">
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
      </div>}
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
