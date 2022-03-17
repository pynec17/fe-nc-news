import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { postArticle } from "../utils/api";

const PostArticle = () => {
  const [title, setTitle] = useState("")
  const [article, setArticle] = useState("")
  const [topic, setTopic] = useState("")
  const [successMessage, setSuccessMessage] = useState(false)
  const { user, setUser} = useContext(UserContext)


  // handle changes
  const titleChange = (value) => {
    setTitle(value)
  }

  const articleChange = (value) => {
    setArticle(value)
  }

  const topicChange = (value) => {
    setTopic(value)
  }

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault()
    postArticle(title, article, topic, user).then((article) => {
      setSuccessMessage(true)
      setTitle("")
      setArticle("")
      setTopic("")
    }).catch((err) => {
      console.dir(err)
    })

  }
  return (
    <div>
      <h1>Post an Article</h1>
      <form onSubmit={handleSubmit}>
        <input required onChange={(event) => titleChange(event.target.value)} value={title} type="text" placeholder="Title here..." />
        <br/>
        <input required onChange={(event) => articleChange(event.target.value)} value={article} type="textarea" placeholder="Article here..." />
        <br/>
        <input required onChange={(event) => topicChange(event.target.value)} value={topic} type="text" placeholder="Topic here..." />
        <button>Submit!</button>
      </form>

      {successMessage && <p>Article successfully posted!</p>}
    </div>
  );
};

export default PostArticle;