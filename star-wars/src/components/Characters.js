import React, { useState, useEffect } from "react";

const getCharacters = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
  });
  return await response.json();
};
export default function Characters() {
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
          return <div onClick={goToCharacterPage}>{character.name}</div>;
        })}
      </ul>
    </div>
  );
}
const goToCharacterPage = (id) => (window.location = `character/${id}`);
