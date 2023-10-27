const jwt_decode = require("jwt-decode");

const authorize = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const decoded = jwt_decode(token);
    req.body = decoded.id;
  }
  next();
};

module.exports = { authorize };
