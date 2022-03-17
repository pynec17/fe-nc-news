import dayjs from "dayjs";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { patchCommentVotes } from "../utils/api";

const SingleComment = ({comment, removeComment}) => {

  const { user, setUser} = useContext(UserContext)
  const [voted, setVoted] = useState(false)
  const [voteIncrement, setVoteIncrement] = useState(0)

  const voteCommentUp = () => {
    if (!voted) {
      setVoteIncrement(1)
      patchCommentVotes(comment.comment_id, 1)
      setVoted(true)
    }
  }

  const voteCommentDown = () => {
    if (!voted) {
      setVoteIncrement(-1)
      patchCommentVotes(comment.comment_id, -1)
      setVoted(true)
    }
  }

  return (
    <div>
      <p>{comment.body}</p>
      <p>{comment.comment_id}</p>
      <p>by {comment.author}</p>
      <p>{dayjs(comment.created_at).format("dddd D MMM, h:mm a")}</p>
      <p>Votes: {comment.votes + voteIncrement}</p>
      {comment.author === user ? <button onClick={() => removeComment(comment.comment_id) }>Delete</button>: <></>}
      <p id={`delete-confirm-${comment.comment_id}`}></p>
      <button onClick={() => voteCommentUp()}>Vote up</button>
      <button onClick={() => voteCommentDown()}>Vote down</button>
    </div>
  );
};

export default SingleComment;