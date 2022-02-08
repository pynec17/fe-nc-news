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

  return (
    <div>
      <p>Homepage</p>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article}/>
      })}

    </div>
  );
};

export default Home;
