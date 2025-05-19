const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/order.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.route("/").get(getUserOrders).post(createOrder);

router.route("/:id").get(getOrder).put(authorize("admin"), updateOrderStatus);

router.get("/admin", authorize("admin"), getAllOrders);

module.exports = router;
