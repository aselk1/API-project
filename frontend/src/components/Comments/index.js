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
            <img className='profilePhoto' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile Img"></img>
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
