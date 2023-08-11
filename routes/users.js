const route = require("express").Router();

route.get("/", (req, res) => {
  res.send("user api");
});

module.exports = route;
