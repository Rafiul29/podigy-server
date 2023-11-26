const User = require("../models/Users");
const { generateToken } = require("../utils/generateToken");

const userRegistration = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, address } = req.body;
    console.log(fullName, phoneNumber, email, password, address);
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
    res.status(404).json({
      error: error.message,
    });
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

module.exports={
  userRegistration,
  userLogin,
}