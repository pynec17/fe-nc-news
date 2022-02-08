import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Home />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
