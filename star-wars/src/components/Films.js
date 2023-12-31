import React from "react";
import { useEffect, useState } from "react";

const fetchFilms = async (url) => {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
  });
  return await response.json();
};

export default function Films() {
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    fetchFilms(`${process.env.REACT_APP_SERVER}/api/films`).then((films) => {
      console.log(films);
      setFilmList(films.sort((a, b) => a.episode_id - b.episode_id));
    });
  }, []);

  return (
    <>
      <h3>Films</h3>
      <ul>
        {filmList.map((film) => {
          return (
            <li key={film.id}>
              <a href={`/films/${film.id}`}>
                Episode {film.episode_id} - {film.title}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
