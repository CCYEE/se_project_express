const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  handleOnFailError,
  handleError,
  ERROR_CODES,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Please, provide both an email and a password.",
    });
  } else {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          bcrypt.hash(password, 10).then((hash) => {
            User.create({ name, avatar, email, password: hash })
              .then((endUser) => {
                const userData = endUser.toObject();
                delete userData.password;
                return res.status(201).send({ data: userData });
              })
              .catch((err) => handleError(err, res));
          });
        } else {
          const ConflictError = new Error(
            "Email address is already being used, please try another email."
          );
          ConflictError.statusCode = 409;
          throw ConflictError;
        }
      })
      .catch((err) => {
        console.error(err);
        console.error(err.name);
        console.error(err.statusCode);
        if (err.name === "MongoServerError") {
          console.error(err);
          const error = new Error("User with this email already exists");
          error.statusCode = 11000;
          handleError(err, res);
        }
        if (err.statusCode === 409) {
          res.status(409).send({
            message:
              "Email address is already being used, please try another email.",
          });
        }
      });
  }
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_CODES.Unauthorized)
      .send({ message: "You are not authorized to do this" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch((err) => {
      console.log(err);
      console.log(err.name);
      handleError(err, res);
    });
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  login,
  createUser,
};