const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

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

router.patch("/:id/status",
    authMiddleware,
    adminMiddleware,
    orderController.updateOrderStatus
)



module.exports = router;