import React, { useState, useEffect } from "react";

const getCharacter = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
  });
  return await response.json();
};

export default function Character(props) {
  const [character, setCharacter] = useState([]);
  useEffect(() => {
    getCharacter(`http://localhost:3000/api/characters/${props.id}`).then(
      (character) => {
        setCharacter(character);
      }
    );
  }, [props.id]);
  return (
    <div>
      <h>Character {character.id}</h>
      <ul>
        <li>Name: {character.name}</li>
        <li>Gender: {character.gender}</li>
        <li>Skin Color: {character.skin_clor}</li>
        <li>Hair Color: {character.hair_color}</li>
        <li>Height: {character.height}</li>
        <li>Eye Color: {character.eye_color}</li>
        <li>Mass: {character.mass}</li>
        <li>Homeworld: {character.homeworld}</li>
        <li>Birth Year: {character.birth_year}</li>
      </ul>
    </div>
  );
}
