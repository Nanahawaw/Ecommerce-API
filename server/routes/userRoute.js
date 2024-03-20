const express = require("express");
const {
  signUp,
  signIn,
  updateUser,
  google,
  signOut,
  deleteUser,
  getAllUsers,
  getUserProfile,
  deleteUserById,
  getuserById,
  updateUserById,
} = require("../controllers/userCtrl.js");

const {
  verifyToken,
  authorizedAdmin,
} = require("../middlewares/verifyToken.js");

const router = express.Router();
//auth routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", google);
router.get("/signout", signOut);

//user routes
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/profile", verifyToken, getUserProfile);

//admin routes
router.get("/", verifyToken, authorizedAdmin, getAllUsers);
router.delete("/:id", verifyToken, authorizedAdmin, deleteUserById);
router.get("/:id", verifyToken, authorizedAdmin, getuserById);
router.put("/:id", verifyToken, authorizedAdmin, updateUserById);

module.exports = router;
