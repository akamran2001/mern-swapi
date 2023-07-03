const express = require("express");
//Data access objects
const character_dao = require("dao/character_access");
const film_dao = require("dao/film_access");
const planet_dao = require("dao/planet_access");
const films_planets_dao = require("dao/films_planets");
const films_characters_dao = require("dao/films_characters");

const app = express();

app.use(express.json());
const port = 3000;
console.log("server starting on port: " + port);
app.listen(port);

app.get("/api/planets", function (req, res) {
  res.json({});
});
