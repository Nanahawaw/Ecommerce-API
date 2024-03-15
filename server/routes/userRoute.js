const express = require("express");
const {
  signUp,
  signIn,
  updateUser,
  google,
  signOut,
  deleteUser,
} = require("../controllers/userCtrl.js");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");

//auth routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.get("/signout", signOut);

//user routes
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

//admin routes

module.exports = router;
