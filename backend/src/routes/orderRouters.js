const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
    "/checkout",
    authMiddleware,
    orderController.checkout
);

router.get("/", 
    authMiddleware,
    orderController.getMyOrders
);

router.get("/:id",
    authMiddleware,
    orderController.getMyOrdersById
);



module.exports = router;