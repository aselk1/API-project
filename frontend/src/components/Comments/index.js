import { useSelector } from "react-redux";
import "./Comments.css";

function Comments() {
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user);
  const commentsArray = Object.values(comments);

  return (
    <div>
      <div className="createComment">
        <img className="profilePhotoSquare" src={user?.imageUrl} alt='Profile'></img>
        <input className="inputComment" type='text' placeholder="Write a comment"></input>
      </div>
      <div className="commentsTitle">comments</div>
      <ul className="commentsList">
        {commentsArray.map((el) => (
          <li className="commentContainer" key={el.id}>
            <img className='profilePhoto' src={el.User.imageUrl} alt="Profile Img"></img>
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
