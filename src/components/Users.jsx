import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles, getUsers } from "../utils/api";

const Users = () => {
  
  const [users, setUsers] = useState([])
  const [articles, setArticles] = useState([])
  
  useEffect(() => {
    getAllArticles(1).then((res) => {
      console.log(res)
    })
    getUsers().then((res) => {
      setUsers(res)
    })
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => {
          return (
            <div>
          <Link to="/articles">{user.username}</Link>
          </div>
          )
        })}
      </ul>
    </div>
  );
};

export default Users;