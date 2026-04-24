const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    addParent,
    addChild,
    addSpouse,
    removeRelationship
} = require("../controllers/relationshipController");

router.post("/parent", protect, addParent);
router.post("/child", protect, addChild);
router.post("/spouse", protect, addSpouse);

router.delete("/", protect, removeRelationship);

module.exports = router;