import { useEffect, useState } from "react";
import { deleteComment, getComments, postComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const Comments = (props) => {

  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])
  const {user, setUser} = useContext(UserContext)

  // Renders comments on page load
  useEffect(() => {
    getComments(props.article_id).then((res) => {
      setComments(res)
    })
  }, [])

  // Handles change to comment box
  const handleChange = (event) => {
    setNewComment(event.target.value)
    console.log(newComment)
  }
  // Submits new comment to api
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newComment)
    postComment(user, newComment, props.article_id).then(() => {
      document.getElementById("comment-confirmation").innerText = "Comment posted!"
      setNewComment("")
    })
    
  }

  const removeComment = (id) => {
    console.log("delete")
    deleteComment(id).then(() => {
      console.log("deleted")
      document.getElementById(`delete-confirm-${id}`).innerText = "Comment deleted!"
      console.log("thing added")
    })
  }

  return (
    <div>
        <h4>Add new comment: </h4>

        <form onSubmit={(event) => {handleSubmit(event)}}>
        <textarea value={newComment} onChange={(event) => {handleChange(event)}} id="comment-box" rows="4" cols="50" />
        <p id="comment-confirmation"></p>
        <button type="submit">Post comment</button> 
        </form>
        
      
      {/* Make this a component */}
      <ul>
        {comments.map((comment) => {
          return <li key={comment.comment_id}>
            <p>{comment.body}</p>
            <p>{comment.author}</p>
            <p>{comment.created_at}</p>
            <p>{comment.votes}</p>
            {comment.author === user ? <button onClick={() => removeComment(comment.comment_id) }>Delete</button>: null}
            <br/>
            <p id={`delete-confirm-${comment.comment_id}`}></p>
          </li>
        })}
        </ul>
    </div>
  );
};

export default Comments; 