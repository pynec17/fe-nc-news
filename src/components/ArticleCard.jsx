const ArticleCard = (props) => {
  return (
    <div className="article-card">
      <h3>{props.article.title}</h3>
      <p>{props.article.topic}</p>
      <p>{props.article.author}</p>
      <p>{props.article.created_at}</p>
      <p>Votes: {props.article.votes}</p>
      <p>Comments: {props.article.comment_count}</p>

    </div>
  );
};

export default ArticleCard;