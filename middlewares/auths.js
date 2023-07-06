const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleError } = require("../utils/errors");


module.exports = (req, res, next) => {
  try {
    const authorization = req.get("authorization");

    if (!authorization) {
      const error = new Error("Authorization token is missing.");
      error.name = "UnauthorizedError";
      throw error;
    }

    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;
    next();
  } catch (err) {
    handleError(err, res);
  }
};
