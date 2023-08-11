const router = require("express").Router();
const User = require("../models/User");
const { EncodeData, CompareEncodedData } = require("../utils/func");

// register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: await EncodeData(req.body.password),
    email: req.body.email,
  });

  try {
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPasswd = await CompareEncodedData(req.body.password, user.password);
    if (!validPasswd) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res
      .status(200)
      .json({ message: "Successfull", _id: user._id.toString() });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
