const router = require("express").Router();
const User = require("../models/User");
const EncodeData = require("../utils/func");

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
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
