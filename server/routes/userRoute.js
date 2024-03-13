const express = require("express");
const {
  signUp,
  signIn,
  updateUser,
  google,
} = require("../controllers/userCtrl.js");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
