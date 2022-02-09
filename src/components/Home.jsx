import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";

const Home = () => {

  const [articles, setArticles] = useState([])
  
  // Get searchParam state and get specific param from it
  const [searchParams, setSearchParams] = useSearchParams()
  
  const topicParam = searchParams.get("topic")

  
  // Get all articles - passes in topic query as topicParam
  useEffect(() => {
    getAllArticles(topicParam).then((res) => {
      setArticles(res);
    })
  }, [topicParam])

  // Handles any change to sort_by or order dropdowns - Gets values of both from getElementById and sends to api function with topicParam

  const getOrder = (event, topicParam) => {
    
    const sortByParam = document.getElementById("sort-by-drop-down").value
    const orderParam = document.getElementById("order-drop-down").value
    
    getAllArticles(topicParam, sortByParam, orderParam).then((res) => {
      setArticles(res)
    })

  }

  return (
    <div>
      <p>Homepage</p>
      {/* Sets default sort_by to created_at - same as in database */}
      <select id="sort-by-drop-down" defaultValue="created_at" onChange={(event) => getOrder(event, topicParam)}>
        <option value="created_at">Created at</option>
        <option value="title">Title</option>
        <option value="topic">Topic</option>
        <option value="author">Author</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment count</option>
      </select>
      
      <select id="order-drop-down" onChange={(event) => {getOrder(event, topicParam)}}>
        <option value="desc" >Descending</option>
        <option value="asc">Ascending</option>
      </select>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article}/>
      })}

    </div>
  );
};

export default Home;
