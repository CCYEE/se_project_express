const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");
const { ERROR_404 } = require("../utils/errors");

router.use("/users", user);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
});

module.exports = router;
