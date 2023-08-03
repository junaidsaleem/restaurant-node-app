const express = require('express');
const Posts = require('../../Model/Posts');
// const Post = require('../../Model/Post');
const router = express.Router();

// ---------------------------- GET ---------------------------------- //

router.get("/post", (req , res) => {
    console.log("get route"); 
    Posts.find()
      .then((post) => {
        res.status(200).send({
          status: "success",
          message: "getting Data!",
          data: post,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  // ------------------------------------- DELETE ------------------------------ //
  router.delete("/post/:id", (req, res) => {
    let id = req.params.id;
    Posts.findByIdAndDelete(id).then(() => {
      res.status(200).send({
        status: "sucess",
        message: "Post Deleted",
      });
    });
  });
  
  // -------------------------------------- POST ----------------------------------- //
  
  router.post("/post", (req, res) => {
    const post = new Posts(req.body);
    post.save().then((items) => {
      res.status(200).send({
        status: "success",
        message: "Posting Data!",
        data: [items],
      });
    });
  });

  // --------------------------------- UPDATE ----------------------------------------- // 

  router.put("/post/:id", (req, res) => {
    let id = req.params.id;
    let updatedData = req.body;
  
    Posts.findByIdAndUpdate(id, updatedData, { new: true })
      .then((updatedPost) => {
        if (!updatedPost) {
          return res.status(404).send({
            status: "error",
            message: "Post not found",
          });
        }
  
        res.status(200).send({
          status: "success",
          message: "Post Updated",
          data: [updatedPost],
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          status: "error",
          message: "An error occurred while updating the post",
        });
      });
  });
  
  module.exports = router;