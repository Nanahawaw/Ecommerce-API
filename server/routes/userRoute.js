const express = require('express');
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
} = require('../controllers/userCtrl.js');

const {
  verifyToken,
  authorizedAdmin,
} = require('../middlewares/verifyToken.js');

const router = express.Router();
//auth routes
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/googleSignIn', google);
router.get('/signout', signOut);

//user routes
router.put('/user/updateProfile', verifyToken, updateUser);
router.delete('/user/delete/:id', verifyToken, deleteUser);
router.get('/user/profile', verifyToken, getUserProfile);

//admin routes
router.get('/admin/allUsers', verifyToken, authorizedAdmin, getAllUsers);
router.delete(
  '/admin/deleteUser/:id',
  verifyToken,
  authorizedAdmin,
  deleteUserById
);
router.get('/admin/user/:id', verifyToken, authorizedAdmin, getuserById);
router.put(
  '/admin/updateUser/:id',
  verifyToken,
  authorizedAdmin,
  updateUserById
);

module.exports = router;
