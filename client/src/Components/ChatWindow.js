import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

const socket = socketIOClient(ENDPOINT, {
	transports: ["websocket"],
});

const ChatWindow = () => {
	const [message, setmessage] = useState(null);
	const [newMessage, setnewMessage] = useState([]);

	const onChange = (e) => {
		setmessage({ ...message, [e.target.name]: e.target.value });

		message &&
			socket.on("typing", () => {
				socket.emit("typing", message.name);
			});
	};

	useEffect(() => {
		socket.on("connection", () => {
			console.log(socket.id);
		});

		socket.on("disconnect", () => {
			console.log("user has disconnected");
		});
	}, []);

	useEffect(() => {
		socket.on("chat", (data) => {
			setnewMessage((arr) => [...arr, data]);
		});
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();

		socket.emit("chat", {
			message: message.message,
			handle: message.handle,
		});
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
					<div id="feedback"></div>
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
