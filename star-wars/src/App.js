import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
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
        <Routes>
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:planet_id" element={<Planet />} />
        </Routes>
        <Link to="/planets">Planets</Link>
        {/* <Planet planet_id={3}></Planet>
        <Films></Films>
        <Film film_id={3}></Film> */}
      </header>
    </div>
  );
}

export default App;
