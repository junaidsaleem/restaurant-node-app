const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      trim: true,
      unique: true,
      // lowercase: true,
    },

    password: {
      type: String,
      // required: true,
      minlength: 4,
    },
    
    title: {
      type: String,
      // required: true,
    },

    description: {
      type: String,
      required: false,
    },

    searchTag: {
      type: String,
    },

    token: {
      type: String,
    }
  },

  { timestamps: true }

  );

  // toDoSchema.index({ username: 1, title: 1 }, { unique: true });
  module.exports = mongoose.model('toDo', toDoSchema);