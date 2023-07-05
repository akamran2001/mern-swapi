import React from "react";
import { useEffect, useState } from "react";

const fetchPlanets = async (url) => {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export default function Planet() {
  const [planets, setPlanet] = useState([]);

  useEffect(() => {
    fetchPlanets("http://localhost:3000/api/planets").then((planets) => {
      console.log(planets);
    });
  }, []);

  return <div>Planet</div>;
}
