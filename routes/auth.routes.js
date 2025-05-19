const express = require("express");
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  refreshToken,
  getProfile,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.get("/user/profile", protect, getProfile);

module.exports = router;
