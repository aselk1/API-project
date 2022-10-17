import { useSelector } from "react-redux";
import './Comments.css'

function Comments() {
  const comments = useSelector((state) => state.comments);
  const commentsArray = Object.values(comments);

  return (
    <div>
      <ul>Comments:
        {commentsArray.map((el) => (
          <li key={el.id}>
            {el.User.username}: {el.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
