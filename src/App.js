import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
import { useState } from "react";
import { UserContext } from "./contexts/User";
import ErrorPage from "./components/ErrorPage";
import PostArticle from "./components/PostArticle";
import Users from "./components/Users";

function App() {
  const [user, setUser] = useState("jessjelly");

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Home />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/postarticle" element={<PostArticle />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
