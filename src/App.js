import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles?topic=cooking" element={<Home />} />
          <Route path="/articles?topic=football" element={<Home />} />
          <Route path="/articles?topic=coding" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
