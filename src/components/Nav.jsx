import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTopics } from "../utils/api";

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then((res) => {
      setTopics(res);
    });
  }, []);

  return (
    <div>
      <hr/>
      <p>Navbar:</p>
      <Link key="home" to="/articles/">Home</Link> 
        {topics.map((topic) => {
          return <Link key={topic.slug} to={`/articles?topic=${topic.slug}`}>{topic.slug}</Link> 
        })}
        <hr/>
    </div>
  );
};

export default Nav;
