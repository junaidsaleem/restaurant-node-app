const mongoose = require('mongoose');

const AlbumsSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      topic: {
        type: String,
        required: true,
        trim: true
      },
      photos: {
        type: Array,
        required: true
      }
    },
    { timestamps: true }
    );

module.exports = mongoose.model('Albums', AlbumsSchema);