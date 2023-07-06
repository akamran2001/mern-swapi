import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import "./App.css";
import Characters from "./components/Characters";
import Character from "./components/Character";
import Planets from "./components/Planets";
import Planet from "./components/Planet";
import Films from "./components/Films";
import Film from "./components/Film";

function App() {
  console.log(Object.keys(process.env));
  return (
    <div className="App">
      <header className="App-header">
        <Planets></Planets>
        <Planet planet_id={3}></Planet>
        <Films></Films>
        <Film film_id={3}></Film>
      </header>
      <nav>
        <Link to="/characters">Characters</Link>
      </nav>
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:_id" element={<Character id={1} />} />
      </Routes>
    </div>
  );
}

export default App;
