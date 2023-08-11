const router = require("express").Router();
const User = require("../models/User");
const EncodeData = require("../utils/func");
const DecodeData = require("../utils/func");

// register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: await EncodeData(req.body.password),
    email: req.body.email,
  });

  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json({ message: "User not found" });

    const validPasswd = await DecodeData(req.body.password, user.password);
    !validPasswd && res.status(400).json({ message: "Invalid password" });

    res.status(200).json({ message: "Successfull" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
