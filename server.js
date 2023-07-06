const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json()); //Parse json
app.use(cors());
app.use(express.static("star-wars/build"));

//Data access objects
const film_dao = require("../dao/film_access");
const character_dao = require("../dao/character_access");
const planet_dao = require("../dao/planet_access");
const films_planets_dao = require("../dao/films_planets_access");
const films_characters_dao = require("../dao/films_characters_access");

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

// GET all characters
app.get("/api/characters", (req, res) => {
  character_dao.findAllCharacters((characters) => {
    if (!characters) {
      res.status(404).end();
    } else {
      res.send(characters);
    }
  });
});

// GET single character
app.get("/api/characters/:id", (req, res) => {
  character_dao.findCharacter(req.params.id, (characters) => {
    if (!characters) {
      res.status(404).end();
    } else {
      res.send(characters);
    }
  });
});

// DELETE a character
app.delete("/api/characters/:id", (req, res) => {
  character_dao.deleteCharacter(req.params.id, (ok) => {
    if (!ok) {
      res.status(404).end();
    } else {
      res.end();
    }
  });
});

// PUT a character
app.put("/api/characters/:id", (req, res) => {
  character_dao.updateCharacter(req.params.id, req.body, (ok) => {
    if (!ok) {
      res.status(404).end();
    } else {
      res.end();
    }
  });
});

// POST a character
app.post("/api/characters", (req, res) => {
  character_dao.addCharacter(req.body, (ok) => {
    if (!ok) {
      res.status(500).end();
    } else {
      res.end();
    }
  });
});

// GET all planets
app.get("/api/planets", (req, res) => {
  planet_dao.findAllPlanets((planets) => {
    if (!planets) {
      res.status(404).end();
    } else {
      res.send(planets);
    }
  });
});

// GET single planet
app.get("/api/planets/:id", (req, res) => {
  planet_dao.findPlanet(req.params.id, (planets) => {
    if (!planets) {
      res.status(404).end();
    } else {
      res.send(planets);
    }
  });
});

// DELETE a planet
app.delete("/api/planets/:id", (req, res) => {
  planet_dao.deletePlanet(req.params.id, (ok) => {
    if (!ok) {
      res.status(404).end();
    } else {
      res.end();
    }
  });
});

// PUT a planet
app.put("/api/planets/:id", (req, res) => {
  planet_dao.updatePlanet(req.params.id, req.body, (ok) => {
    if (!ok) {
      res.status(404).end();
    } else {
      res.end();
    }
  });
});

// POST a planet
app.post("/api/planets", (req, res) => {
  planet_dao.addPlanet(req.body, (ok) => {
    if (!ok) {
      res.status(500).end();
    } else {
      res.end();
    }
  });
});

// Films's planets
app
  .route("/api/films/:id/planets")
  .get((req, res) => {
    /*
     * Respond with planet IDs
     */
    films_planets_dao.findAllFilmPlanets(req.params.id, (films_planets) => {
      if (!films_planets) {
        res.status(404).end();
      } else {
        films_planets = films_planets.map((item) => {
          return item.planet_id;
        });
        res.send(films_planets);
      }
    });
  })
  .post((req, res) => {
    films_planets_dao.addFilmPlanet(req.params.id, req.body, (ok) => {
      if (!ok) {
        res.status(500).end();
      } else {
        console.log(ok.insertedId);
        res.end();
      }
    });
  });

// Planets films
app
  .route("/api/planets/:id/films")
  .get((req, res) => {
    films_planets_dao.findAllPlanetFilms(req.params.id, (planet_films) => {
      if (!planet_films) {
        res.status(404).end();
      } else {
        planet_films = planet_films.map((item) => {
          return item.film_id;
        });
        res.send(planet_films);
      }
    });
  })
  .post((req, res) => {
    films_planets_dao.addPlanetFilm(req.params.id, req.body, (ok) => {
      if (!ok) {
        res.status(500).end();
      } else {
        console.log(ok.insertedId);
        res.end();
      }
    });
  });

// GET all characters for a film
// Returns character id of the characters. Client should HTTP request
// for character objects, subsequently.
app.get("/api/films/:id/characters", (req, res) => {
  films_characters_dao.findAllFilmCharacters(req.params.id, (characters) => {
    if (!characters) {
      res.status(404).end();
    } else {
      characters = characters.map((x) => {
        return x.character_id;
      });
      res.send(characters);
    }
  });
});

// GET all films for a character
// Returns film id of the films. Client should HTTP request
// for film objects, subsequently.
app.get("/api/characters/:id/films", (req, res) => {
  films_characters_dao.findAllCharacterFilms(req.params.id, (films) => {
    if (!films) {
      res.status(404).end();
    } else {
      films = films.map((x) => {
        return x.film_id;
      });
      res.send(films);
    }
  });
});

// POST a character <=> film association
app.post("/api/films/:id/characters", (req, res) => {
  films_characters_dao.addFilmCharacter(req.params.id, req.body, (ok) => {
    if (!ok) {
      res.status(404).end();
    } else {
      res.end();
    }
  });
});
// POST a character <=> film association
app.post("/api/characters/:id/films", (req, res) => {
  films_characters_dao.addCharacterFilm(req.params.id, req.body, (ok) => {
    if (!ok) {
      res.status(404).end();
    } else {
      res.end();
    }
  });
});

//start server
const port = 3000;
console.log(`http://localhost:${port}`);
app.listen(port);
