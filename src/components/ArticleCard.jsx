import { Link } from "react-router-dom";

const ArticleCard = (props) => {
  return (
    <div className="article-card">
      <Link to={`/articles/${props.article.article_id}`}><h3>{props.article.title}</h3></Link>
      <p>{props.article.topic}</p>
      <p>{props.article.author}</p>
      <p>{props.article.created_at}</p>
      <p>Votes: {props.article.votes}</p>
      <p>Comments: {props.article.comment_count}</p>

    </div>
  );
};

export default ArticleCard;