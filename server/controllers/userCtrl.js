const UserErrors = require("../middlewares/ErrorHandlers");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//auth controllers

const signUp = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ error: UserErrors.USER_ALREADY_EXISTS });
    }
    const newUser = await User.create({
      name,
      email,
      mobile,
      password: hashedpassword,
    });
    // Don't send the entire newUser object in the response
    res.status(201).json({
      message: "User created successfully",

      userId: newUser._id,
    });
  } catch (error) {
    // Send detailed error message in response
    res.status(500).json({ error: error.message });
  }
};

//login

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: UserErrors.NO_USER_FOUND });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: UserErrors.WRONG_CREDENTIALS });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    //destructuring the password
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ rest, message: "You are Logged in" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//sign in with google

const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //destructuring the password
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ rest, message: "You are Logged in" });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedpassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedpassword,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ rest, message: "You are Logged in" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//sign out

const signOut = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json("You have logged out");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//user controllers

//update userprofile
const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    return res.status(401).json("You can only update your own account");
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          mobile: req.body.mobile,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete user

const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    return res.status(401).json("You can only delete your own account");
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted sucessfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } else {
    res.status(404).json({ error: UserErrors.NO_USER_FOUND });
  }
};

//admin controllers

// get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// delete user by id

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ error: "Cannot delete admin user" });
      }
      await User.deleteOne({ _id: user._id });
      return res.json({ message: "User removed successfully" });
    } else {
      return res.status(404).json({ error: UserErrors.NO_USER_FOUND });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//get a user

const getuserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const { password: pass, ...rest } = user._doc;
    res.json(rest);
  } else {
    res.status(404).json({ error: UserErrors.NO_USER_FOUND });
  }
};

//update a user

const updateUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      name: updatedUser.name,
    });
  } else {
    res.status(404).json({ error: UserErrors.NO_USER_FOUND });
  }
};

module.exports = {
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
};
