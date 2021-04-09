const Message = require("../models/message");

module.exports = {
	createMessage: async (req, res) => {
		try {
			const newMessage = new Message({
				message: req.body.message,
				date: req.body.date,
				handle: req.body.handle,
				id: req.id,
			});

			res.json(await newMessage.save());
		} catch (err) {
			console.log("Something went wrong:", err);
			res.send(err);
		}
	},

	getMessages: async (req, res) => {
		try {
			const allMessages = await Message.find({});
			res.json(allMessages);
		} catch (err) {
			console.log("Something went wrong:", err);
			res.send(err);
		}
	},
};
