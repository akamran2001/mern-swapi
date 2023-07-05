const mongod = require("mongodb"); //mono client library
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "swapi";
const collectionName = "planets";
let collection;

async function startup() {
  let client = new MongoClient(url);
  await client.connect();
  var db = client.db(dbName);
  collection = db.collection(collectionName);
}
startup();

//GET all planets
module.exports.findAllPlanets = (callback) => {
  let dataPromise = collection.find({}).toArray();
  dataPromise.then((planets) => callback(planets));
};

// GET a single planet
module.exports.findPlanet = (id, callback) => {
  let dataPromise = collection.findOne({ id: parseInt(id) });
  dataPromise.then((planet) => callback(planet));
};

// DELETE a single planet
module.exports.deletePlanet = (id, callback) => {
  let dataPromise = collection.deleteOne({ id: parseInt(id) });
  dataPromise.then((ok) => {
    callback(ok);
  });
};

//PUT a planet
module.exports.updatePlanet = (id, planet, callback) => {
  delete planet._id;
  let dataPromise = collection.updateOne(
    { id: parseInt(id) },
    { $set: planet },
    { upsert: true },
    callback
  );
  dataPromise.then((ok) => {
    callback(ok);
  });
};

// POST a planet
module.exports.addPlanet = (planet, callback) => {
  delete planet._id;
  let dataPromise = collection.insertOne(planet);
  dataPromise.then((ok) => callback(ok));
};
