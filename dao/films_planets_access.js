const mongod = require("mongodb"); //mono client library
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "swapi";
const collectionName = "films_planets";
let collection;

async function startup() {
  let client = new MongoClient(url);
  await client.connect();
  var db = client.db(dbName);
  collection = db.collection(collectionName);
}
startup();

//retreive all film_planets
module.exports.findAllFilmPlanets = function (film_id, callback) {
  let dataPromise = collection.find({ film_id: parseInt(film_id) }).toArray();
  dataPromise.then((films_planets) => callback(films_planets));
};

// Post a film_planet
module.exports.addFilmPlanet = (film_id, film_planet, callback) => {
  let dataPromise = collection.insertOne({
    film_id: parseInt(film_id),
    planet_id: film_planet.planet_id,
  });
  dataPromise.then((ok) => callback(ok));
};

// Retrieve all planet_films
module.exports.findAllPlanetFilms = function (planet_id, callback) {
  let dataPromise = collection
    .find({
      planet_id: parseInt(planet_id),
    })
    .toArray();
  dataPromise.then((planet_films) => callback(planet_films));
};

module.exports.addPlanetFilm = (planet_id, planet_film, callback) => {
  let dataPromise = collection.insertOne({
    planet_id: parseInt(planet_id),
    film_id: planet_film.film_id,
  });
  dataPromise.then((ok) => callback(ok));
};
