import React from "react";
import { useEffect, useState } from "react";

const fetchFilm = async (url) => {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
  });
  return await response.json();
};

const fetchFilmPlanets = async (film_id) => {
  const init = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
  };
  const response = await fetch(
    `${process.env.REACT_APP_SERVER}/api/films/${film_id}/planets`,
    init
  );
  let film_planets = await response.json();
  film_planets = film_planets.map((item) => {
    return fetch(`${process.env.REACT_APP_SERVER}/api/planets/${item}`);
  });
  let responses = await Promise.all(film_planets);
  responses = responses.map((res) => res.json());
  return await Promise.all(responses);
};

export default function Film({ film_id }) {
  const [film, setFilm] = useState({});
  const [filmPlanets, setFilmPlanets] = useState([]);

  useEffect(() => {
    fetchFilm(`${process.env.REACT_APP_SERVER}/api/films/${film_id}`).then(
      (f) => {
        console.table(f);
        setFilm(f);
      }
    );
    fetchFilmPlanets(film_id).then((planets) => {
      setFilmPlanets(planets);
    });
  }, [film_id]);
  return (
    <>
      <h3>Episode {film.episode_id} details</h3>
      <div>
        <table border={3}>
          <thead>
            <tr>
              <th>Episode</th>
              <th>Title</th>
              <th>Producer</th>
              <th>Director</th>
              <th>Date</th>
              <th>Opening</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{film.episode_id}</td>
              <td>{film.title}</td>
              <td>{film.producer}</td>
              <td>{film.director}</td>
              <td>{film.release_date}</td>
              <td>{film.opening_crawl}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3> Planets featuring Episode {film.episode_id}</h3>
        <ul>
          {filmPlanets.map((planet) => {
            return (
              <li key={planet.id}>
                <a href={`/planets/${planet.id}`}>{planet.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
