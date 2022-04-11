const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Prevent CORS Issues
app.use(cors);

// Create server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Listen for connection event
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
});
