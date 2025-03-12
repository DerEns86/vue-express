const express = require("express");
const cors = require("cors");
const http = require("http"); // Importiere das http-Modul
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app); // Erstellt einen HTTP-Server

const io = new Server(server, {
  cors: {
    origin: [process.env.HOST_LOCAL, process.env.HOST_NETWORK], // Erlaubt Verbindungen von diesem Client
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

io.on("connection", (socket) => {
  socket.on("set username", (username) => {
    socket.username = username || `User-${socket.id.substring(0, 5)}`; // Falls leer, nutze ID
  });

  console.log("a user connected");
  socket.on("my message", (msg) => {
    const sender = socket.username || `User-${socket.id.substring(0, 5)}`;
    io.emit("my broadcast", `${sender}: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5000, () => console.log(" Server läuft auf Port 5000"));
