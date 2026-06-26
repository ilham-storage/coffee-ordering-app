const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController")
const cartController = require("../controllers/cartController")
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");



router.post ("/",
    authMiddleware,
    adminMiddleware,
    productController.create
);

router.get("/",
    productController.getAll
);
router.get("/:id",
     productController.getById)

router.delete("/:id", 
    authMiddleware, 
    adminMiddleware, 
    productController.remove
);

router.post("/",
    authMiddleware,
    cartController.addToCart
)

router.get("/",
    authMiddleware,
    cartController.getCart
);

router.patch("/:id",
    authMiddleware,
    adminMiddleware,
    productController.update
);

module.exports = router;