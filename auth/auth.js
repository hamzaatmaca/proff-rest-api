const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  next();
};

module.exports = Auth;
