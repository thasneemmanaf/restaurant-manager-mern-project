const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

// To generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// To sign up a new user and create token
exports.signupUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch {
    next(new AppError("Unable to signup at the moment", 401));
  }
};

// To login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password is supplied
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 401));
    }

    // 2. Check if user exists
    const user = await User.findOne({ email }).select("+password");

    // 3. Check if password is correct
    if (user && !(await user.verifyPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // 4. If everything is ok, let the user login and generate token
    createSendToken(user, 200, res);
  } catch {
    next(new AppError("Unable to login at the moment", 401));
  }
};

// Get user based on Token when App refresh
exports.fetchUser = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({
      status: "unauthorized",
    });
  } else {
    // 1. Token Verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 2. Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (currentUser) {
      res.status(200).json({
        status: "success",
        data: {
          user: currentUser,
        },
      });
    } else {
      next(new AppError("User does not exist! Unauthorized access", 401));
    }
  }
};

// Logout user and clear JWT cookie
exports.logoutUser = (req, res, next) => {
  res.clearCookie("jwt");
  return res.status(200).json({ status: "success" });
};

// To delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      return next(new AppError("Cannot find a user with this user id!", 401));
    }

    res.status(200).json({
      status: "success",
      data: {
        user: deletedUser,
      },
    });
  } catch {
    next(new AppError("Unable to delete user at the moment", 401));
  }
};

/**
 To authenticate user
 1. Check if token is supplied in the request
 2. Check if token is valid
 3. Check if user still exist. Possible that user account is deleted after token is issued
 4. Check if user changed password after token is issued
 */

// To authenticate user login
exports.authenticateUser = async (req, res, next) => {
  let token = req.cookies.jwt;

  // 1. To check if there is a token. Extracted token using parser
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  if (!token) {
    res.status(401).json({
      status: "unauthorized",
    });
  } else {
    // 2. Token Verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (currentUser) {
      next();
    } else {
      next(new AppError("User does not exist! Unauthorized access", 401));
    }
  }
};
