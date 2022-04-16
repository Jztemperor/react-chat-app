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

  //Join room event
  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User: ${data.name} joined room: ${data.room}`);
  });

  // Send message event
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log(`User disconnected, id: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server running...");
});
