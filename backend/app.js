const express = require('express');

const app = express();

const authRoutes = require("./src/routes/authRoutes")

const productRoutes = require("./src/routes/productRoute");

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/product", productRoutes);

module.exports = app;