import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import videoroutes from './Routes/video.js';
import userroutes from "./Routes/User.js";
import commentroutes from './Routes/comment.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Socket & VoIP
import { Server as SocketIOServer } from "socket.io";
import http from "http";

// Fix for __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Express app setup
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route
app.get('/', (req, res) => {
  res.send("Your tube is working");
});

// Routes
app.use('/user', userroutes);
app.use('/video', videoroutes);
app.use('/comment', commentroutes);

// ✅ Add group & payment routes (make sure these are in ES module syntax too)
import groupRoutes from './Routes/group.js';
import paymentRoutes from './Routes/payment.js';

app.use('/api/group', groupRoutes);
app.use('/api/payment', paymentRoutes);

// MongoDB connection
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch((error) => {
  console.error("DB connection error:", error);
});

// ✅ Create HTTP Server and attach Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ✅ Socket.IO Event Handling
io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomId, userId }) => {
    socket.join(roomId);
    console.log(`${userId} joined room ${roomId}`);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      console.log(`${userId} disconnected from room ${roomId}`);
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

// ✅ Start Combined Express + Socket Server
server.listen(PORT, () => {
  console.log(`Express + Socket server running on port ${PORT}`);
});