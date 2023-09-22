const express = require("express");
const mongoose = require("mongoose");
const customersRouter = require("./Router/customers");
const albumsRouter = require("./Router/albums");
const dotenv = require("dotenv");
const CustomLogger = require("./Utils/CustomLog");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.DB_URL || "mongodb://localhost:27017/UBIT";

// Middleware
app.use(express.json());

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    CustomLogger("Connected to MongoDB successfully");

    // Routes
    app.use("/", customersRouter);
    app.use("/", albumsRouter);

    // Start the server
    app.listen(port, () => {
      CustomLogger(`Server is running on ${port}`);
    });
  } catch (err) {
    CustomLogger("Error connecting to MongoDB:", err);
  }
}

startServer();
