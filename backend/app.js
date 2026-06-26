const express = require('express');

const app = express();

const authRoutes = require("./src/routes/authRoutes")

const productRoutes = require("./src/routes/productRoutes");

const cartRoutes = require("./src/routes/cartRoutes");

const orderRoutes = require("./src/routes/orderRouters");

app.use(express.json());


app.use("/auth", authRoutes);

app.use("/product", productRoutes);

app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);

module.exports = app;