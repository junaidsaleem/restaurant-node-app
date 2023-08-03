
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< Updated upstream
const router = require('./Router/customers');
=======
const customersRouter = require('./Router/customers');
const AlbumsRouter = require('./Router/Albums');
const PostsRouter = require("./Router/Post"); 
>>>>>>> Stashed changes
const app = express();
const port = 3000;

//Check git


// Middleware
app.use(express.json());
// MongoDB connection URL
<<<<<<< Updated upstream
const url = 'mongodb://localhost:27017/bootcamp';
=======
const url = 'mongodb://0.0.0.0:27017/Post';
>>>>>>> Stashed changes
// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
// Routes
<<<<<<< Updated upstream
app.use('/', router);
=======
app.use('/', customersRouter);
app.use('/', AlbumsRouter);
app.use('/' , PostsRouter);
>>>>>>> Stashed changes
