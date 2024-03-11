const UserErrors = require("../middlewares/ErrorHandlers");
const User = require("../models/userModel");

const signUp = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (findUser) {
    res.status(400).json({ type: UserErrors.USER_ALREADY_EXISTS });
  } else {
    const newUser = User.create(req.body);
    res.json(newUser);
  }
};

module.exports = signUp;
