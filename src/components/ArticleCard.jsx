import { Link } from "react-router-dom";
import dayjs from "dayjs";
// import { HashLink } from "react-router-hash-link"

const ArticleCard = (props) => {
  return (
    <div className="article-card">
      {/* Link to article */}
      <Link to={`/articles/${props.article.article_id}`}>{props.article.title}</Link>
      {/* Author and date */}
      <p>by {props.article.author} on {dayjs(props.article.created_at).format("dddd D MMM [at] h:mm a")} </p>
      {/* Topic (with link) */}
      <Link key={props.article.topic} to={`/articles?topic=${props.article.topic}`}>{props.article.topic}</Link>
      {/* Vote count */}
      <p id="vote-number">{props.article.votes}</p>
      {/* Comment count */}
      <p>{props.article.comment_count} comments</p>
      {/* Link to comments in article - doesn't work  */}
      {/* <HashLink to={`/articles/${props.article.article_id}/#comment-container`}> Go to Comments</HashLink> */}

    </div>
  );
};

export default ArticleCard;