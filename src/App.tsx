import React from "react";
import Home from "./pages/Home";
import FavoriteRepoPages from "./pages/FavoriteReposPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/starred-repos" element={<FavoriteRepoPages />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
