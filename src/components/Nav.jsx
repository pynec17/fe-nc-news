import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTopics } from "../utils/api";
// MUI
import { Button } from "@mui/material";

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics().then((res) => {
      setTopics(res);
    });
  }, []);

  return (
    <div className="nav-bar">
      <Button variant="contained" color="success"><Link key="home" to="/articles/">Home</Link></Button> 
        {topics.map((topic) => {
          return <Button variant="contained" color="success"><Link key={topic.slug} to={`/articles?topic=${topic.slug}`}>{topic.slug}</Link></Button> 
        })}
        <hr/>
    </div>
  );
};

export default Nav;
