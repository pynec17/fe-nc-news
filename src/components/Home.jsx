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

  const sortBy = (event, topicParam) => {
    console.log(event.target.value)
    const sortByParam = event.target.value
    getAllArticles(topicParam, sortByParam)
    
  }

  return (
    <div>
      <p>Homepage</p>
      <select onChange={(event) => sortBy(event, topicParam)} id="article-sort-by">
        <option disabled selected value>Select an option</option>
        <option value="title">Title</option>
        <option value="topic">Topic</option>
        <option value="author">Author</option>
        <option value="created_at">Created at</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment count</option>
      </select>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article}/>
      })}

    </div>
  );
};

export default Home;
