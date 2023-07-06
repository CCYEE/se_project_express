const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  updateItem,
  likeItem,
  dislikeItem,
  deleteItem,

} = require("../controllers/clothingItems");

router.post("/", auth, createItem);

router.put("/:itemId", auth, updateItem);
router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, dislikeItem);

router.get("/", getItems);

module.exports = router;