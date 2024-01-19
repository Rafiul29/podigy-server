const User = require("../models/users");
const { generateToken } = require("../utils/generateToken");

const userRegistration = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, address } = req.body;
    const user = await User.register(
      fullName,
      phoneNumber,
      email,
      password,
      address
    );

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(404).json({
        error: "phone number already in used",
      });
    } else {
      res.status(404).json({
        error: error.message,
      });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
