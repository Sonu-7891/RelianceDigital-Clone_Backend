const express = require("express");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize("admin"));

// Import controllers
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

// Product routes
router.route("/products").get(getProducts).post(createProduct);

router.route("/products/:id").put(updateProduct).delete(deleteProduct);

// Order routes
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

module.exports = router;
