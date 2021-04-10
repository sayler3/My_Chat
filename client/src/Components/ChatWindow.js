import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:5000";
const heroku = io.connect(window.location.hostname);

const socket = socketIOClient(heroku, {
	transports: ["websocket"],
});

const ChatWindow = () => {
	const [message, setmessage] = useState(null);
	const [newMessage, setnewMessage] = useState([]);
	const [handle, sethandle] = useState(null);

	const onChange = (e) => {
		setmessage({ ...message, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		socket.on("connection", () => {
			console.log(socket.id);
		});

		socket.on("disconnect", () => {
			console.log("user has disconnected");
		});

		socket.on("typing", (data) => {
			sethandle(data);
		});
	}, []);

	useEffect(() => {
		socket.on("chat", (data) => {
			sethandle(null);
			setnewMessage((arr) => [...arr, data]);
		});
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();

		socket.emit("chat", {
			message: message.message,
			handle: message.handle,
		});
		sethandle(null);
	};

	const handleKey = () => {
		message && socket.emit("typing", message.handle);
	};

	return (
		<>
			<div id="mario-chat">
				<div id="chat-window">
					<div id="output">
						{newMessage.map((chat, index) => (
							<p key={index}>
								<strong>{chat.handle}:</strong> {chat.message}
							</p>
						))}
					</div>
					<div id="feedback">
						{handle ? (
							<p>
								<em>{handle} is typing a message...</em>
							</p>
						) : null}
					</div>
				</div>
				<input
					onChange={onChange}
					id="handle"
					name="handle"
					type="text"
					placeholder="Handle"
				/>
				<input
					onChange={onChange}
					onKeyPress={handleKey}
					id="message"
					name="message"
					type="text"
					placeholder="Message"
				/>
				<button onClick={sendMessage} id="send">
					Send
				</button>
			</div>
		</>
	);
};

export default ChatWindow;
