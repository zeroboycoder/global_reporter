require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.signedToken = (data) => jwt.sign(data, SECRET_KEY);

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      status: "error",
      msg: "There's no token.",
      data: "",
    });
  }

  const decoded = jwt.verify(token, SECRET_KEY);
  /*
   * Do something with the decoded token
   */
  return next();
};
