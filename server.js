const express = require("express");

//Data access objects
const film_dao = require("./film_access");
const character_dao = require("dao/character_access");
const planet_dao = require("dao/planet_access");
const films_planets_dao = require("dao/films_planets");
const films_characters_dao = require("dao/films_characters");

const app = express();

app.use(express.json()); //Parse json

// Get all films
app.get("/api/films", (req, res) => {
  film_dao.findAllFilms((films) => {
    if (!films) {
      res.status(404).end();
    } else {
      res.send(films);
    }
  });
});

// Get single film
app.get("/api/films/:id", (req, res) => {
  film_dao.findFilm(req.params.id, (film) => {
    if (!film) {
      res.status(404).end();
    } else {
      res.send(film);
    }
  });
});

// Delete a film
app.delete("/api/films/:id", (req, res) => {
  film_dao.deleteFilm(req.params.id, (ok) => {
    if (!ok) {
      res.status(404).end();
    } else {
      res.end();
    }
  });
});

// Update a film
app.put("/api/films/:id", (req, res) => {
  film_dao.updateFilm(req.params.id, req.body, (ok) => {
    if (!ok) {
      res.status(404).end();
    } else {
      res.end();
    }
  });
});

// Post a film
app.post("/api/films", (req, res) => {
  film_dao.addFilm(req.body, (ok) => {
    if (!ok) {
      res.status(500).end();
    } else {
      res.end();
    }
  });
});

//start server
const port = 3000;
console.log(`http://localhost:${port}`);
app.listen(port);
