import { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { deleteArticle, getArticle, patchVotes } from "../utils/api";
import dayjs from "dayjs";
import Comments from "./Comments";
import ErrorPage from "./ErrorPage";
import { UserContext } from "../contexts/User";

const SingleArticle = () => {
  
  // States and params
  const { article_id } = useParams()
  const [error, setError] = useState(null)
  const [article, setArticle] = useState({})
  const [voteIncrement, setVoteIncrement] = useState(0)
  const [voted, setVoted] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const {user, setUser} = useContext(UserContext)

  // Fetch article from api when page loads
  useEffect(() => {
    getArticle(article_id).then((res) => {
      setArticle(res)
    })
    .catch((err) => {
      setError({err})
      const expErr = { err }
      console.log(expErr.err.response.data.message)
    })
  }, [])

  // Handles vote changes
  const voteUp = () => {
    if (!voted) {
      setVoteIncrement(currVoteIncrement => currVoteIncrement + 1)
      setVoted(true)
      patchVotes(article_id, 1 )
    }
  }

  const voteDown = () => {
    if (!voted) {
    setVoteIncrement(currVoteIncrement => currVoteIncrement - 1)
    setVoted(true)
    patchVotes(article_id, -1)
    }
  }
  
  const removeArticle = () => {
    deleteArticle(article_id).then(() => {
      setDeleted(true)
    })
  }

  // Renders page
  if (error) {
    return <ErrorPage message={error.err.response.data.message} />
  } else if (deleted) {
    return <h1>Article deleted!</h1>
  }
    return (
      <div>
        {/* Make an article component */}
        <p>{article_id}</p>
        <h1>{article.title}</h1>
        <p>by {article.author}</p>
        <p>at {dayjs(article.created_at).format("dddd D MMM, h:mm a")}</p>
        
        <p>{article.topic}</p>
        <br/>
        <article>{article.body}</article>
        <p>Votes: {article.votes + voteIncrement}</p>
        <p>{article.comment_count} comments</p>
        <button onClick={() => voteUp()}>Vote up!</button>
        <button onClick={() => voteDown()}>Vote down!</button>
        <br/>
        {article.author===user && <button onClick={() => removeArticle()}>Delete</button>}
        <hr/>

        <Comments article_id={article_id} />

      </div>
    );
};

export default SingleArticle;