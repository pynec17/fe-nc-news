import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { getArticle, patchVotes } from "../utils/api";

import Comments from "./Comments";

const SingleArticle = () => {

  const { article_id } = useParams()
  const [article, setArticle] = useState({})
  const [voteIncrement, setVoteIncrement] = useState(0)



  useEffect(() => {
    getArticle(article_id).then((res) => {
      setArticle(res)
    })
  }, [])

  const voteUp = (article_id) => {
    setVoteIncrement(currVoteIncrement => currVoteIncrement + 1)
    patchVotes(article_id, 1 )
  }

  const voteDown = () => {
    setVoteIncrement(currVoteIncrement => currVoteIncrement - 1)
    patchVotes(article_id, -1)
  }

    return (
      <div>
        {/* Make an article component */}
        <p>{article_id}</p>
        <h1>{article.title}</h1>
        <p>by {article.author}</p>
        <p>at {article.created_at}</p>
        <p>{article.topic}</p>
        <br/>
        <br/>
        <p>{article.body}</p>
        <p>Votes: {article.votes + voteIncrement}</p>
        <p>{article.comment_count} comments</p>
        <button onClick={() => voteUp(article_id)}>Vote up!</button>
        <button onClick={() => voteDown()}>Vote down!</button>
        <hr/>
        <h3> Comments </h3>
        <Comments article_id={article_id} />

      </div>
    );
};

export default SingleArticle;