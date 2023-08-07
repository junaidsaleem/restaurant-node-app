const express = require('express');
const toDoList = require('../../Model/toDo');
const toDoFormatter = require('../../Formatters/toDo');
const { createToken, checkToken  } = require('../../Auth');
const middleware = require('../../Middleware');
const router = express.Router();

// logging in with token generation
router.post("/login", (req, res) => {
  const { username, password } = req.body

  toDoList.findOne({ username: username }).then((user) => {

    console.log(user)
    console.log(username + password)
    if (!user) {
      return res.status(200).json({
        status: 'error',
        message: "Username does not exist",
      });
    }

    if (user.password !== password) {
      return res.status(200).json({
        status: 'error',
        message: "Incorrect password",
      });
    }
    const token = createToken(user); 
    console.log(token)

    const isVerified = checkToken(token);

    user.updateOne({ token: token.toString() }).then( (updateCheck) => {

      res.status(200).json({
        status: 'success',
        message: 'Login successfull',
        data: toDoFormatter(user),
        token: token
      });

    }

    ).catch((err) => { console.log(err) })

  }).catch((err) => { console.log(err) })

})

// Route to retrieve all users
router.get('/user', middleware  ,(req, res) => {
  toDoList.find({})
    .then((users) => {
      let userList = users.map((user) => user.username);
      res.status(200).json({
        status: 'success',
        message: 'All Users retrieved successfully',
        data: userList,
      });
    })
    .catch((err) => {
      console.error('Error retrieving Users List:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve User data',
        error: err.message,
      });
    });
});

// Route to create a new user
router.post('/user', (req, res) => {
  const newUser = new toDoList(req.body);
  newUser
    .save()
    .then((user) => {
      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        Username: user.username,
      });
    })
    .catch((err) => {
      console.error('Error creating user:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create user',
        error: err.message,
      });
    });
});

// Route to create a new item in list
router.post('/userlist', middleware, (req, res) => {
  const newItem = new toDoList(req.body);
  newItem
    .save()
    .then((item) => {
      res.status(201).json({
        status: 'success',
        message: 'Item created successfully',
        Username: item.searchTag,
        Title: item.title,
        Description: item.description
      });
    })
    .catch((err) => {
      console.error('Error creating item:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create item',
        error: err.message,
      });
    });
});

// Route to retrieve a user's list
router.get('/userlist/:searchTag', middleware, (req, res) => {

  const {searchTag} = req.params;
  console.log( 'username:' + searchTag)

  toDoList.find({searchTag: searchTag})
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'User retrieved successfully',
          Tasks: (user)
        });
      }
    })
    .catch((err) => {
      console.error('Error retrieving customer:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve customer data',
        error: err.message,
      });
    });
});

// Route to update a single customer
router.put('/userlist/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  toDoList.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: 'Item not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'Item updated successfully',
          data: toDoFormatter(item),
        });
      }
    })
    .catch((err) => {
      console.error('Error updating item:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update item',
        error: err.message,
      });
    });
});

// Route to delete a single customer
router.delete('/userlist/:id', middleware, (req, res) => {
  const { id } = req.params;
  toDoList.findByIdAndDelete(id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: 'Item not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'Item deleted successfully',
          data: toDoFormatter(item),
        });
      }
    })
    .catch((err) => {
      console.error('Error deleting item:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete item',
        error: err.message,
      });
    });
});

module.exports = router;

