const UserErrors = require("../middlewares/ErrorHandlers");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(400).json({ error: UserErrors.USER_ALREADY_EXISTS });
    } else {
      const newUser = await User.create({
        name,
        email,
        mobile,
        password: hashedpassword,
      });
      res.status(201).json({
        newUser,
        message: "user created successfully",
      });
    }
  } catch (error) {
    res.status(500).json("Internal server error");
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
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

//update a user
const updateUser = async (req, res, next) => {
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
    res.status(500).json("Internal server error");
  }
};

module.exports = { signUp, signIn, updateUser };
