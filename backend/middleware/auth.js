const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    console.info("Decoded token: ", { d: decodedToken, t: token });
    const userId = decodedToken.userId;
    console.info("UserID: ", userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    console.warn("Error caught in auth middleware: ", error);
    let err = "";
    if (
      error
        .toString()
        .includes("TypeError: Cannot read properties of undefined") === true
    )
      err = "Null token";
    if (
      error
        .toString()
        .includes("TypeError: Cannot read properties of undefined") === false
    )
      err = "Invalid User";
    res.status(401).json({
      error: err,
    });
  }
};
