const express = require('express');
const products = require('../../Model/products');
const productFormatter = require('../../Formatters/products');
const middleware = require('../../Middleware');
const router = express.Router();


// Route to retrieve all products
router.get('/products', middleware  ,(req, res) => {
    products.find()
      .then((products) => {
        let formattedproducts = products.map((product) =>
          productFormatter(product));
        res.status(200).json({
          status: 'success',
          message: 'product data retrieved successfully',
          data: formattedproducts,
        });
      })
      .catch((err) => {
        console.error('Error retrieving products:', err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to retrieve product data',
          error: err.message,
        });
      });
  });
  
  // Route to create a new product
  router.post('/products', (req, res) => {
    const newproduct = new products(req.body);
    newproduct
      .save()
      .then((product) => {
        res.status(201).json({
          status: 'success',
          message: 'product created successfully',
          data: productFormatter(product),
        });
      })
      .catch((err) => {
        console.error('Error creating product:', err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to create product',
          error: err.message,
        });
      });
  });
  
  // Route to retrieve a single product
  router.get('/products/:id', (req, res) => {
    const { id } = req.params;
  
    products.findById(id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            status: 'error',
            message: 'product not found',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'product data retrieved successfully',
            data: productFormatter(product),
          });
        }
      })
      .catch((err) => {
        console.error('Error retrieving product:', err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to retrieve product data',
          error: err.message,
        });
      });
  });
  
  // Route to update a single product
  router.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    products.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    )
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            status: 'error',
            message: 'product not found',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'product updated successfully',
            data: productFormatter(product),
          });
        }
      })
      .catch((err) => {
        console.error('Error updating product:', err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to update product',
          error: err.message,
        });
      });
  });
  
  // Route to delete a single product
  router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    products.findByIdAndDelete(id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            status: 'error',
            message: 'product not found',
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'product deleted successfully',
            data: productFormatter(product),
          });
        }
      })
      .catch((err) => {
        console.error('Error deleting product:', err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to delete product',
          error: err.message,
        });
      });
  });
  
  module.exports = router;
  