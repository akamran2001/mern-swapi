import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Character from "./Character";
import { useParams } from "react-router-dom";

const getCharacters = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
  });
  return await response.json();
};
export default function Characters() {
  const { id } = useParams();
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    getCharacters("http://localhost:3000/api/characters").then((characters) =>
      setCharacters(characters)
    );
  }, []);

  return (
    <div>
      <ul>
        {characters.map((character) => {
          return (
            <div>
              <nav>
                <Link to={`/character/${character.id}`}>{character.name}</Link>
              </nav>
              <Routes>
                <Route
                  path={`/character/${character.id}`}
                  element={<Character id={character.id} />}
                />
              </Routes>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
