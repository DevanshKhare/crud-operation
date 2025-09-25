const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require('../middleware/auth');

const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
  message: "Too many requests",
});

router.use(limiter);

router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
