const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "swapi";
const collectionName = "films";
let collection;

async function startup() {
  let client = new MongoClient(url);
  await client.connect();
  let db = client.db(dbName);
  collection = db.collection(collectionName);
}
startup();

// retrieve all films
module.exports.findAllFilms = (callback) => {
  let dataPromise = collection.find({}).toArray();
  dataPromise.then((films) => callback(films));
};

// retrieve single film
module.exports.findFilm = (id, callback) => {
  let dataPromise = collection.findOne({ id: parseInt(id) });
  dataPromise.then((film) => callback(film));
};

// delete a film
module.exports.deleteFilm = (id, callback) => {
  let dataPromise = collection.deleteOne({ id: parseInt(id) });
  dataPromise.then((ok) => {
    callback(ok);
  });
};

// update a film
module.exports.updateFilm = (id, film, callback) => {
  delete film._id;
  let dataPromise = collection.updateOne(
    { id: parseInt(id) },
    { $set: film },
    { upsert: true },
    callback
  );
  dataPromise.then((ok) => {
    callback(ok);
  });
};

// Post a film
module.exports.addFilm = (film, callback) => {
  delete film._id;
  let dataPromise = collection.insertOne(film);
  dataPromise.then((ok) => callback(ok));
};
