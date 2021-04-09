const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 5000;
require("./models/mongoConnection");
require("dotenv").config();

app.use(cors());

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const io = socket(server);

io.on("connection", (socket) => {
	console.log("socket connection made from server", socket.id);

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

// Setup routes
app.use("/api", require("./routes/messageRoutes"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

server.listen(PORT, () =>
	console.log(`Listening at: http://localhost:${PORT}`)
);
