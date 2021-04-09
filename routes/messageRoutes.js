const router = require("express").Router();

const {
	getMessages,
	createMessage,
} = require("../controllers/messageController");

router.get("/allMessages", getMessages);
router.post("/newMessage", createMessage);

module.exports = router;
