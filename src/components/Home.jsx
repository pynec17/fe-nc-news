import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
import "./Articles.css"

const Home = () => {

  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [orderParam, setOrderParam] = useState("desc")
  const [sortByParam, setSortByParam] = useState("created_at")
  
  const location = useLocation()  
  const queries = new URLSearchParams(location.search)
  const topicParam = queries.get("topic")

  // Get all articles - passes in optional topic/sort_by/order queries
  useEffect(() => {
    getAllArticles(topicParam, sortByParam, orderParam).then((res) => {
      setArticles(res);
    })
    .catch((err) => {
      setError({err})
      console.log({err})
    })
  }, [topicParam, sortByParam, orderParam])

  // Renders page
  if (error) {
    return <ErrorPage message={error.err.response.data.message} />
  }
  return (
    <div>
      {/* Sets default sort_by to created_at - same as in database */}
      <select id="sort-by-drop-down" onChange={(event) => setSortByParam(event.target.value)} >
        <option value="created_at">Created at</option>
        <option value="title">Title</option>
        <option value="topic">Topic</option>
        <option value="author">Author</option> 
        <option value="votes">Votes</option>
        <option value="comment_count">Comment count</option>
      </select>
      
      <select id="order-drop-down" onChange={(event) => setOrderParam(event.target.value)}>
        <option value="desc" >Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <div class="article-container">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article}/>
      })}
      </div>

    </div>
  );
};

export default Home;
