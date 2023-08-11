const route = require("express").Router();
const User = require("../models/User");

// update user info
route.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json("Account updated");
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete user account
route.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = route;
