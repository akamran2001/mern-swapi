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

//retreive all books
module.exports.findAllFilmCharacters = function (callback) {
  //let dataPromise = collection.find({}).toArray();
  //dataPromise.then((books) => callback(books));
};

// retrieve a single book
module.exports.findFilmCharacter = function (isbn, callback) {
  //let dataPromise = collection.findOne({ isbn: isbn });
  //dataPromise.then((book) => callback(book));
};

// delete a single book
module.exports.deleteFilmCharacter = function (isbn, callback) {
  //let dataPromise = collection.deleteOne({ isbn: isbn });
  //dataPromise.then((ok) => callback(ok));
};
