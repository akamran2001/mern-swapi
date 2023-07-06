import React from "react";
import { useEffect, useState } from "react";

const fetchPlanets = async (url) => {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
  });
  return await response.json();
};

export default function Planets() {
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    fetchPlanets(`${process.env.REACT_APP_SERVER}/api/planets`).then(
      (planets) => {
        console.log(planets);
        setPlanetList(planets);
      }
    );
  }, []);

  return (
    <>
      <h3>Planets</h3>
      <ul>
        {planetList.map((planet) => {
          return (
            <li key={planet.id}>
              <a href={`/planets/${planet.id}`}>{planet.name}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
