import { useEffect, useState } from "react";
import { getAllArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";

const Home = () => {

  const [articles, setArticles] = useState([])

  // Get all articles
  useEffect(() => {
    getAllArticles().then((res) => {
      setArticles(res);
    })
  }, [])

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
