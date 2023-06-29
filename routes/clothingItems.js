const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);
router.get("/", getItems);
router.delete("/:itemsId", deleteItem);
router.delete("/:itemId/likes", unlikeItem);
router.put("/:itemsId/likes", likeItem);

module.exports = router;
