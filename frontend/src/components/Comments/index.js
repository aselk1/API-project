import { useSelector } from "react-redux";
import "./Comments.css";

function Comments() {
  const comments = useSelector((state) => state.comments);
  const commentsArray = Object.values(comments);

  return (
    <div>
      <div className="commentsTitle">comments</div>
      <ul className="commentsList">
        {commentsArray.map((el) => (
          <li className="commentContainer" key={el.id}>
            <div className="commentUser">{el.User.username}</div>
            <div className="comment">{el.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
