import { useEffect, useState } from "react";
import { deleteComment, getComments, postComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import SingleComment from "./SingleComment";

const Comments = (props) => {

  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])
  const [sort, setSort] = useState("date")
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState()
  const {user, setUser} = useContext(UserContext)

  // Renders comments on page load
  useEffect(() => {
    getComments(props.article_id, page).then((res) => {
      setComments(res)
      setTotalCount(res[0].total_count)
    })
  }, [page])
  

  // handles comment sorting
  useEffect(() => {
    if (sort === "recent") {
      setComments((comments) => {
        return [...comments].sort((a, b) => b.created_at.localeCompare(a.created_at))
      })
    } else if (sort === "earliest") {
      setComments((comments) => {
        return [...comments].sort((a, b) => a.created_at.localeCompare(b.created_at))
      })
    } else if (sort === "votes-asc") {
      setComments((comments) => {
        return [...comments].sort((a, b) => a.votes - b.votes)
      })
    } else if (sort === "votes-desc") {
      setComments((comments) => {
        return [...comments].sort((a, b) => b.votes - a.votes)
      })
    }
  }, [sort])

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
        <button onClick={() => setSort("recent")}>Sort by most recent</button>
        <button onClick={() => setSort("earliest")}>Sort by earlist</button>
        <button onClick={() => setSort("votes-asc")}>Sort by votes - ascending</button>
        <button onClick={() => setSort("votes-desc")}>Sort by votes - descending</button>
        <p>{sort}</p>
        <h3>Comments</h3>
        <h4>Add new comment: </h4>
        <form onSubmit={(event) => {handleSubmit(event)}}>
        <textarea value={newComment} placeholder="Write comment here..." onChange={(event) => {handleChange(event)}} id="comment-box" rows="4" cols="50" />
        <p id="comment-confirmation"></p>
        <button type="submit">Post comment</button> 
        </form>

        <div id="comment-container"> 
        {comments.map((comment) => {
          return (
            <div className="comment-box">
            <SingleComment comment={comment} removeComment={removeComment}/>
        
            </div>
          )
        })}
      </div>
      <button onClick={() => {setPage((currPage) => currPage - 1)}} disabled={page===1}>Previous page</button>
      <p>Page:{page}</p>
      <button onClick={() => {setPage((currPage) => currPage + 1)}} disabled={page*5>=totalCount}>Next page</button>
    </div>
  );
};

export default Comments; 