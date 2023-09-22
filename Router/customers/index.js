const express = require("express");
const customers = require("../../Model/customers");
const customerFormatter = require("../../Formatters/customers");
const { createToken, checkToken } = require("../../Auth");
const middleware = require("../../Middleware");
const CustomLogger = require("../../Utils/CustomLog");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  customers
    .findOne({ email: email })
    .then((user) => {
      CustomLogger(user);
      if (!user) {
        return res.status(200).json({
          status: "error",
          message: "This email doesn't belong to any customer.",
        });
      }

      if (user.password !== password) {
        return res.status(200).json({
          status: "error",
          message: "incorrect password",
        });
      }
      const token = createToken(user);
      CustomLogger(token);

      const isVerified = checkToken(token);

      user
        .updateOne({ token: token.toString() })
        .then((updateCheck) => {
          res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: customerFormatter(user),
            token: token,
          });
        })
        .catch((err) => {
          CustomLogger(err);
        });
    })
    .catch((err) => {
      CustomLogger(err);
    });
});

// Route to retrieve all customers
router.get("/customers", middleware, (req, res) => {
  customers
    .find()
    .then((customers) => {
      let formattedCustomers = customers.map((customer) =>
        customerFormatter(customer),
      );
      res.status(200).json({
        status: "success",
        message: "Customer data retrieved successfully",
        data: formattedCustomers,
      });
    })
    .catch((err) => {
      console.error("Error retrieving customers:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve customer data",
        error: err.message,
      });
    });
});

// Route to create a new customer
router.post("/customers", (req, res) => {
  const newCustomer = new customers(req.body);
  newCustomer
    .save()
    .then((customer) => {
      res.status(201).json({
        status: "success",
        message: "Customer created successfully",
        data: customerFormatter(customer),
      });
    })
    .catch((err) => {
      console.error("Error creating customer:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to create customer",
        error: err.message,
      });
    });
});

// Route to retrieve a single customer
router.get("/customers/:id", (req, res) => {
  const { id } = req.params;

  customers
    .findById(id)
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({
          status: "error",
          message: "Customer not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Customer data retrieved successfully",
          data: customerFormatter(customer),
        });
      }
    })
    .catch((err) => {
      console.error("Error retrieving customer:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to retrieve customer data",
        error: err.message,
      });
    });
});

// Route to update a single customer
router.put("/customers/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  customers
    .findByIdAndUpdate(id, { name, email, phone }, { new: true })
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({
          status: "error",
          message: "Customer not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Customer updated successfully",
          data: customerFormatter(customer),
        });
      }
    })
    .catch((err) => {
      console.error("Error updating customer:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to update customer",
        error: err.message,
      });
    });
});

// Route to delete a single customer
router.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  customers
    .findByIdAndDelete(id)
    .then((customer) => {
      if (!customer) {
        return res.status(404).json({
          status: "error",
          message: "Customer not found",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "Customer deleted successfully",
          data: customerFormatter(customer),
        });
      }
    })
    .catch((err) => {
      console.error("Error deleting customer:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to delete customer",
        error: err.message,
      });
    });
});

module.exports = router;
