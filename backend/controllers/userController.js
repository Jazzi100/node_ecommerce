const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// Login user

const loginUser = async (req, res) => {
  console.log("request : ", req.body);
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new createError.HttpError(
      500,
      "Loging failed please try again.."
    );
    return next(error);
  }
  if (!existingUser) {
    //res.status(401).send({ message: "Invalid Credentials" });
    const error = new createError.HttpError(401, "Invalid Credentials");
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    // const error = new HttpError(
    //   "could not loign, please check your credientials..",
    //   500
    // );
    const error = new createError.HttpError(
      500,
      "could not loign, please check your credientials.."
    );
    return next(error);
  }
  if (!isValidPassword) {
    // const error = new HttpError("Invalid credientials, could not login", 401);
    // return next(error);
    res.status(401).send({ message: "Invalid credientials, could not login" });
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "5h" }
    );
  } catch (err) {
    //const error = new HttpError("Logging failed please try again..", 500);
    const error = new createError.HttpError(
      500,
      "Logging failed please try again.."
    );
    return next(error);
  }
  res.json({
    user: existingUser,
    token: token,
  });
  //res.json({ message: "login user" });
};

// Signup user
const signupUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.json({ message: "email and password fields must be filled...!" });
    }
    if (!validator.isEmail(req.body.email)) {
      res.json({ message: "email not valid...!" });
    }

    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      res.json({ message: "email already exists...!" });
    }
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(req.body.password, 12);
    } catch (err) {
      const error = new HttpError(
        "could not create user, please try again.",
        500
      );
      // const error = new createError.HttpError(
      //   500,
      //   "could not create user, please try again."
      // );
      return next(error);
    }
    const requestBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashPassword,
      profilePicture: req.files,
    };

    let user = new User(requestBody);

    const result = await user.save();
    if (result) {
      let token;
      try {
        token = jwt.sign(
          { userId: result._id, email: result.email },
          "supersecret_dont_share",
          { expiresIn: "5h" }
        );
      } catch (err) {
        //const error = new HttpError("Signing Up failed please try again..", 500);
        const error = new createError.HttpError(
          500,
          "Signing Up failed please try again.."
        );
        return next(error);
      }
      res.json({
        userId: result._id,
        email: result.email,
        token: token,
      });
    } else {
      res.json({ message: "something went wrong" });
    }
  } catch (error) {
    console.error("Error caught while handling signup:", error);
    res.status(500).send(error);
  }
};

module.exports = { loginUser, signupUser };
