const mongod = require("mongodb"); //mono client library
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "swapi";
const collectionName = "films_characters";
let collection;

async function startup() {
  let client = new MongoClient(url);
  await client.connect();
  var db = client.db(dbName);
  collection = db.collection(collectionName);
}
startup();

//GET all character for a film
module.exports.findAllFilmCharacters = (film_id, callback) => {
  let dataPromise = collection.find({ film_id: parseInt(film_id) }).toArray();
  dataPromise.then((character_id) => callback(character_id));
};

// GET all films for a character
module.exports.findAllCharacterFilms = (character_id, callback) => {
  let dataPromise = collection
    .find({ character_id: parseInt(character_id) })
    .toArray();
  dataPromise.then((film_id) => callback(film_id));
};

//POST a character <=> film association
module.exports.addFilmCharacter = (film_id, character, callback) => {
  let dataPromise = collection.insertOne({
    character_id: parseInt(character.id),
    film_id: parseInt(film_id),
  });
  dataPromise.then((ok) => callback(ok));
};

//POST a character <=> film association
module.exports.addCharacterFilm = (character_id, film, callback) => {
  let dataPromise = collection.insertOne({
    character_id: parseInt(character_id),
    film_id: parseInt(film.id),
  });
  dataPromise.then((ok) => callback(ok));
};
