const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.get("/", protect, authorize("admin"), wishlistController.getWishlist);
router.post("/add", protect, authorize("admin"), wishlistController.addToWishlist);
router.post(
  "/remove",
  protect,
  authorize("admin"),
  wishlistController.removeFromWishlist
);

module.exports = router;
