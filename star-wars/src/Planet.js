import React from "react";
import { useEffect, useState } from "react";

const fetchPlanet = async (url) => {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
  });
  return await response.json();
};

const fetchPlanetFilms = async (planet_id) => {
  const init = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
  };
  const response = await fetch(
    `http://localhost:3000/api/planets/${planet_id}/films`,
    init
  );
  let planet_films = await response.json();
  planet_films = planet_films.map((item) => {
    return fetch(`http://localhost:3000/api/films/${item}`);
  });
  let responses = await Promise.all(planet_films);
  responses = responses.map((res) => res.json());
  return await Promise.all(responses);
};

export default function Planet({ planet_id }) {
  const [planet, setPlanet] = useState({});
  const [planetFilms, setPlanetFilms] = useState([]);

  useEffect(() => {
    fetchPlanet(`http://localhost:3000/api/planets/${planet_id}`).then((p) => {
      console.table(p);
      setPlanet(p);
    });
    fetchPlanetFilms(planet_id).then((films) => {
      console.log(films);
      setPlanetFilms(films.sort((a, b) => a.episode_id - b.episode_id));
    });
  }, [planet_id]);

  return (
    <>
      <h3>Planet {`${planet_id}`} features</h3>
      <div>
        <table border={3}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Climate</th>
              <th>Surface Water</th>
              <th>Diameter</th>
              <th>Rotation Period</th>
              <th>Terrain</th>
              <th>Gravity</th>
              <th>Orbital Period</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.diameter}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.terrain}</td>
              <td>{planet.gravity}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.population}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3>Films featuring Planet {`${planet_id}`}</h3>
        <ul>
          {planetFilms.map((film) => {
            return (
              <li key={film.id}>
                <a href={`/films/${film.id}`}>
                  Episode {film.episode_id} - {film.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
