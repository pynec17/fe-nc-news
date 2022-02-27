import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTopics } from "../utils/api";
import "../Nav.css"

const Nav = () => {
  const [topics, setTopics] = useState([]);

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
    
    </nav>
  );
};

export default Nav;
