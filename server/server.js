// Dependencies
const express = require("express");
const app = express();

const { sequelize } = require("sequelize");
const path = require("path");
const cors = require("cors");

// Config & Middleware
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Controllers

const godsController = require("./controllers/gods_controller");
app.use("/api/gods", godsController);

// Listen
app.listen(4005, () => {
  console.log("Server running on 4005!");
});
