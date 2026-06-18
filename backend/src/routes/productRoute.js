const express = require('express');
const router = express.Router();

const productController = require("../controllers/productController")
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

router.put("/:id", authMiddleware,
    adminMiddleware,
    productController.update
);

router.delete("/:id", 
    authMiddleware, 
    adminMiddleware, 
    productController.remove
);

module.exports = router;