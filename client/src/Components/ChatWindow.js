import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

const ChatWindow = () => {
	useEffect(() => {
		const socket = socketIOClient(ENDPOINT, {
			transports: ["websocket"],
		});

		socket.on("connection", () => {
			console.log(socket.id);
		});

		socket.on("disconnect", () => {
			console.log("user has disconnected");
		});
	}, []);
	return (
		<>
			<div id="mario-chat">
				<div id="chat-window">
					<div id="output"></div>
					<div id="feedback"></div>
				</div>
				<input id="handle" type="text" placeholder="Handle" />
				<input id="message" type="text" placeholder="Message" />
				<button id="send">Send</button>
			</div>
		</>
	);
};

export default ChatWindow;
