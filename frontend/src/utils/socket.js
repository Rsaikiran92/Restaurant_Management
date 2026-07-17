import { io } from "socket.io-client";

const socket = io("https://restaurant-management-z2s6.onrender.com/");

export default socket;