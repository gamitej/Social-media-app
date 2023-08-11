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

// get user account
route.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// follow user
route.put("/:id/follow", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const followUserId = req.body.userId;
    const followUser = await User.findById(followUserId);
    if (userId === followUserId)
      return res.status(400).json({ message: "You can't follow yourself" });

    if (!user.followers.includes(followUserId)) {
      await user.updateOne({ $push: { followers: followUserId } });
      await followUser.updateOne({ $push: { following: userId } });
      return res.status(200).json({ message: "Followed successfully" });
    }
    return res.status(403).json({ message: "Already follow this user" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = route;
