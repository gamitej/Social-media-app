const route = require("express").Router();
const User = require("../models/User");

// update user info
route.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route;
