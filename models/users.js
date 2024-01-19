const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "dev"],
      default: "user",
      required: true,
    },
    orders:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      }
    ]
  },
  { timestamps: true }
);

// register
UserSchema.statics.register = async function (
  fullName,
  phoneNumber,
  email,
  password,
  address
) {

  if (!fullName || !phoneNumber || !email || !password || !address) {
    throw new Error("Must fill name, email,password,phone number and address");
  }
 
  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exist");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must 8+ char contains uppercase lowercase, number and special char"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    fullName,
    phoneNumber,
    email,
    password: hash,
    address,
  });
  return user;
};

// login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Must fill email and password");
  }
  
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect email or password");
  }
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
