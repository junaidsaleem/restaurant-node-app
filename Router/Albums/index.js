const express = require("express");
const Albums = require("../../Model/Albums");
const AlbumsFormatter = require("../../Formatters/Albums");
const router = express.Router();

router.get("/albums", (req, res) => {
  Albums.find()
    .then((albums) => {
      let formattedAlbums = albums.map((album) => AlbumsFormatter(album));
      res.status(200).json({
        status: "success",
        message: "Albums data retrieved successfully",
        data: formattedAlbums,
      });
    })
    .catch((err) => {
      console.error("Error retrieving Albums:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve Albums data",
        error: err.message,
      });
    });
});

router.post("/albums", (req, res) => {
  const newAlbum = new Albums(req.body);
  newAlbum
    .save()
    .then((album) => {
      res.status(201).json({
        status: "success",
        message: "Album created successfully",
        data: AlbumsFormatter(album),
      });
    })
    .catch((err) => {
      console.error("Error creating Album:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to create Album",
        error: err.message,
      });
    });
});

router.put("/albums/:id", (req, res) => {
  const { id } = req.params;
  const { name, topic, photos } = req.body;
  Albums.findByIdAndUpdate(id, { name, topic, photos }, { new: true })
    .then((album) => {
      if (!album) {
        return res.status(404).json({
          status: "error",
          message: "Album not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Album updated successfully",
          data: AlbumsFormatter(album),
        });
      }
    })
    .catch((err) => {
      console.error("Error updating Album:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to update Album",
        error: err.message,
      });
    });
});

router.delete("/albums/:id", (req, res) => {
  const { id } = req.params;
  Albums
    .findByIdAndDelete(id)
    .then((album) => {
      if (!album) {
        return res.status(404).json({
          status: "error",
          message: "Album not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Album deleted successfully",
          data: AlbumsFormatter(album),
        });
      }
    })
    .catch((err) => {
      console.error("Error deleting Album:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to delete Album",
        error: err.message,
      });
    });
});

module.exports = router;
