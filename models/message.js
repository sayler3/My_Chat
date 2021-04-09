const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	message: {
		type: String,
		trim: true,
		required: true,
	},

	date: {
		type: Date,
		default: Date.now,
	},

	handle: {
		type: String,
		trim: true,
	},

	id: {
		type: String,
		required: true,
	},
});

module.exports = Message = mongoose.model("message", messageSchema);
