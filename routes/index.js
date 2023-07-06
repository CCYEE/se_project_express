const router = require("express").Router();
const User = require("./users");
const clothingItem = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { ERROR_CODES } = require("../utils/errors");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/items", clothingItem);
router.use("/users", User);

router.use((req, res) => {
  res
    .status(ERROR_CODES.NotFound)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
