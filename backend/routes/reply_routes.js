const express = require("express");
const router = express.Router();

const { createReply,getRepliesByDoubt } = require("../controllers/reply_controller");

router.post("/:doubtId", createReply);
router.get("/:doubtId", getRepliesByDoubt);

module.exports = router;
