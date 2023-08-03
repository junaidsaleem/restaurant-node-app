const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      body: {
        type: String,
        required: true,
        trim: true,
      },
      author: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  

  module.exports = mongoose.model('CRUD', postsSchema);