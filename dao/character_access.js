const mongod = require("mongodb"); //mono client library
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "swapi";
const collectionName = "characters";
let collection;

async function startup() {
  let client = new MongoClient(url);
  await client.connect();
  var db = client.db(dbName);
  collection = db.collection(collectionName);
}
startup();

// GET all characters
module.exports.findAllCharacters = (callback) => {
  let dataPromise = collection.find({}).toArray();
  dataPromise.then((characters) => callback(characters));
};

// GET character
module.exports.findCharacter = function (id, callback) {
  let dataPromise = collection.findOne({ id: parseInt(id) });
  dataPromise.then((character) => callback(character));
};

// DELETE a character
module.exports.deleteCharacter = function (id, callback) {
  let dataPromise = collection.deleteOne({ id: parseInt(id) });
  dataPromise.then((ok) => {
    callback(ok);
  });
};

// PUT a character
module.exports.updateCharacter = (id, character, callback) => {
  delete character._id;
  let dataPromise = collection.updateOne(
    { id: parseInt(id) },
    { $set: character },
    { upsert: true },
    callback
  );
  dataPromise.then((ok) => {
    callback(ok);
  });
};

module.exports.addCharacter = (film, callback) => {
  delete character._id;
  let dataPromise = collection.insertOne(film);
  dataPromise.then((ok) => callback(ok));
};
