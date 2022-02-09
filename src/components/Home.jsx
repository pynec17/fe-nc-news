import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";

const Home = () => {

  const [articles, setArticles] = useState([])
  
  // Get searchParam state and get specific param from it
  const [searchParams, setSearchParams] = useSearchParams()
  
  const topicParam = searchParams.get("topic")

  
  // Get all articles - passes in topic query as topicParam, "title" as default sort by and renders when page loads
  useEffect(() => {
    getAllArticles(topicParam).then((res) => {
      setArticles(res);
    })
  }, [topicParam])

  // Handles changes to sort_by drop down menu - takes current topicParam and sort_by value

  const sortBy = (event, topicParam) => {
    console.log(event.target.value)
    const sortByParam = event.target.value
    getAllArticles(topicParam, sortByParam).then((res) => {
      setArticles(res)
    })
    
  }



  return (
    <div>
      <p>Homepage</p>
      {/* Sets default sort_by to created_at - same as in database */}
      <select defaultValue="created_at" onChange={(event) => sortBy(event, topicParam)}>
        <option value="created_at">Created at</option>
        <option value="title">Title</option>
        <option value="topic">Topic</option>
        <option value="author">Author</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comment count</option>
      </select>
      <select>
        <option value="descending">Descending</option>
        <option value="ascending">Ascending</option>
      </select>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article}/>
      })}

    </div>
  );
};

export default Home;
