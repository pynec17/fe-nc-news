import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { getArticle } from "../utils/api";
import Comments from "./Comments";

const SingleArticle = () => {
// Get article ID from params in URL
// Do useeffect to get article info
// Make component for each comment?

const { article_id } = useParams()
const [article, setArticle] = useState({})

useEffect(() => {
  getArticle(article_id).then((res) => {
    setArticle(res)
  })
}, [])



  return (
    <div>
      <p>{article.article_id}</p>
      <p>{article_id}</p>
      <h1>{article.title}</h1>
      <p>by {article.author}</p>
      <p>at {article.created_at}</p>
      <p>{article.topic}</p>
      <br/>
      <br/>
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
      <p>{article.comment_count} comments</p>
      <hr/>
      <h3> Comments </h3>
      <Comments article_id={article_id} />
    </div>
  );
};

export default SingleArticle;