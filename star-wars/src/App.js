import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Characters from "./components/Characters";
import Character from "./components/Character";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/characters">Characters</Link>
        <Link to="/character">Character</Link>
      </nav>
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/" element={<Character id={1} />} />
      </Routes>
    </div>
  );
}

export default App;
