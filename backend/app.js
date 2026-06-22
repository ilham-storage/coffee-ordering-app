const express = require('express');

const app = express();

const authRoutes = require("./src/routes/authRoutes")

const productRoutes = require("./src/routes/productRoute");

const cartRoutes = require("./src/routes/cartRoutes");


app.use(express.json());


app.use("/auth", authRoutes);

app.use("/product", productRoutes);

app.use("/cart", cartRoutes);

module.exports = app;