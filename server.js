const express = require("express");
//const dao = require("./data_access");
const app = express();

app.use(express.json());
const port = 3000;
console.log("server starting on port: " + port);
app.listen(port);

app.get("/api/planets", function (req, res) {
  res.json({});
});
