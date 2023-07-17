const { Router } = require("express");
const { PostModel } = require("../models/post.model");
require("dotenv").config();
const postRouter = Router();

postRouter.get("/", async (req, res) => {

    const {device1, device2} = req.query
    const {userId} = req.body;
    const Query = {};
    if(userId){
        Query.userId = userId
    }

 if(device1 && device2){
    Query.device = {$and: [{device: device1}, {device: device2}]}
 }
 else if(device1){
   Query.device = device1
 }
 else if(device2){
    Query.device = device2
  }

  try {
    let post = await PostModel.find(Query)
    res.status(200).json({msg: "user Posts", post});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


postRouter.patch("/update/:postID", async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
    try {
      const post = await PostModel.findByIdAndUpdate({ userId, _id: postId });
  
      if (!post) {
        res.status(400).json({ msg: "Post not found" });
      } else {
        res.status(200).json({ msg: "Post updated" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


postRouter.delete("/delete/:postID", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findByIdAndDelete({ userId, _id: postId });

    if (!post) {
      res.status(400).json({ msg: "Post not found" });
    } else {
      res.status(200).json({ msg: "Post deleted" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { postRouter };
