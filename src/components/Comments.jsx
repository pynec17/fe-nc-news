import { useEffect, useState } from "react";
import { getComments } from "../utils/api";

const Comments = (props) => {

  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(props.article_id).then((res) => {
      setComments(res)
    })
  }, [])

  return (
    <div>
      {/* Make this a component */}
      <ul>
        {comments.map((comment) => {
          return <li>
            <p>{comment.body}</p>
            <p>{comment.author}</p>
            <p>{comment.created_at}</p>
            <p>{comment.votes}</p>
            <br/>
          </li>
        })}
        </ul>
    </div>
  );
};

export default Comments; 