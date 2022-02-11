import { useEffect, useState } from "react";
import { deleteComment, getComments, postComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import dayjs from "dayjs";

const Comments = (props) => {

  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])
  const {user, setUser} = useContext(UserContext)

  // Renders comments on page load
  useEffect(() => {
    getComments(props.article_id).then((res) => {
      setComments(res)
    })
  }, [comments])

  // Handles change to comment box
  const handleChange = (event) => {
    setNewComment(event.target.value)
  }
  // Submits new comment to api
  const handleSubmit = (event) => {
    event.preventDefault()
    postComment(user, newComment, props.article_id).then(() => {
      document.getElementById("comment-confirmation").innerText = "Comment posted!"
      setNewComment("")
    }) 
  }

  // Removes comment 
  const removeComment = (id) => {
    deleteComment(id)
  }

  return (
    <div>
        <h4>Add new comment: </h4>
        <form onSubmit={(event) => {handleSubmit(event)}}>
        <textarea value={newComment} placeholder="Write comment here..." onChange={(event) => {handleChange(event)}} id="comment-box" rows="4" cols="50" />
        <p id="comment-confirmation"></p>
        <button type="submit">Post comment</button> 
        </form>

      {/* Make this a component */}
        <div id="comment-container"> 
        {comments.map((comment) => {
          return <div  key={comment.comment_id} className="comment-box">
            <p>{comment.body}</p>
            <p>by {comment.author}</p>
            <p>{dayjs(comment.created_at).format("dddd D MMM, h:mm a")}</p>
            <p>Votes: {comment.votes}</p>
            {comment.author === user ? <button onClick={() => removeComment(comment.comment_id) }>Delete</button>: <></>}
            <p id={`delete-confirm-${comment.comment_id}`}></p>
            </div>
        })}
      </div>
    </div>
  );
};

export default Comments; 