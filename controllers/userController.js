const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) throw "User doesnt exist";
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) throw "Invalid password";
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "5h" }
    );

    return res.status(200).json({
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.error("Error caught while logging in: ", error);
    // if(error === 'Invalid password') return res.status(401).json({ message: error })
    res.status(500).json({ message: error });
  }
};

// Signup user
const signupUser = async (req, res) => {
  try {

    console.info('Req', req.body)
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

// Logout
const logoutUser = async (req, res) => {
  
}

module.exports = { loginUser, signupUser, logoutUser };
