const router = require("express").Router();
const {
  getItems,
  createItem,
  likeItem,
  unlikeItem,
  deleteItem,
} = require("../controllers/clothingItem");

router.get("/", getItems);
router.post("/", createItem);
router.put("/:itemsId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);
router.delete("/:itemsId", deleteItem);

module.exports = router;
