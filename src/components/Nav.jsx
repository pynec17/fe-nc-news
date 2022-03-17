import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllTopics } from "../utils/api";
import { UserContext } from "../contexts/User";
import "../Nav.css"

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    getAllTopics().then((res) => {
      setTopics(res);
    });
  }, []);

  return (
    <nav className="nav-bar">
      <div className="nav-button">
      <Link key="home" to="/articles/">Home</Link>
      </div>
        {topics.map((topic) => {
          return <div className="nav-button"><Link key={topic.slug} to={`/articles?topic=${topic.slug}` }>{topic.slug}</Link></div> 
        })}
        <div className="nav-button">
      <Link key="post" to="/postarticle/">Post an Article</Link>
      </div>
        <div className="nav-button">
      <Link key="users" to="/users">Users</Link>
      </div>
      <div className="user-link">
      Logged in as: {user}
      </div>
    </nav>
  );
};

export default Nav;
