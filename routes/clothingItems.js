const router = require("express").Router();
const {
  createItem,
  getItems,
  likeItem,
  unlikeItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);
router.get("/", getItems);
router.put("/:itemsId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);
router.delete("/:itemsId", deleteItem);

module.exports = router;
