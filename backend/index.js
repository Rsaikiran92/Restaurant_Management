import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import menuRouter from "./routes/menuRoute.js";
import authRouter from "./routes/authRoute.js";
import orderRouter from "./routes/orderRoute.js";
import tableRouter from "./routes/tableRoute.js";
import{ Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// store io globally
app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/menu", menuRouter);
app.use("/api/table",tableRouter);
app.use("/api/order",orderRouter);


app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT,"0.0.0.0", () => console.log(`Server running on ${PORT}`));
