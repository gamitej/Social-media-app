const route = require("express").Router();
const User = require("../models/User");

route.put("/:id", (req, res) => {
  const userId = User.findById(req.params.id);
  console.log(userId);
});

module.exports = route;
