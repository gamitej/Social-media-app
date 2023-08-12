const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    await newPost.save();
    return res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // no post found
    if (!post) return res.status(404).json({ message: "No post found" });

    // update the post
    await post.updateOne({ $set: req.body });
    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    await post.deleteOne();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// like a post
router.put("/:id/like", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "No such post" });

    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({ message: "Post disliked" });
    }
    await post.updateOne({ $push: { likes: req.body.userId } });
    return res.status(200).json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get all posts
router.post("/all/timeline", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friend) => {
        Post.find({ userId: friend });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
