const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "User must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "User must have a last name"],
  },
  email: {
    type: String,
    required: [true, "User must have an email id"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minlength: 5,
    select: false,
  },
});

// To encrypt the password after receiving and before saving to DB
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Verify the user password
userSchema.methods.verifyPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// User model
module.exports = mongoose.model("User", userSchema);
