const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  console.log(req.headers)
  const token = req.header("x-auth-token");
  console.log(token, "here hu")
  // Check if not token
  if (!token) {
    console.log("heree")
    return res
      .status(401)
      .json({ msg: 'No token present, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, "iamyash");

    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("bruh")
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
