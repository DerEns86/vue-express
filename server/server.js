const express = require("express");
const cors = require("cors");
const http = require("http"); // Importiere das http-Modul
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Erstellt einen HTTP-Server

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Erlaubt Verbindungen von diesem Client
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("my message", (msg) => {
    io.emit("my broadcast", `server: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("my message", (msg) => {
    console.log("message: " + msg);
  });
});

// Wichtig: Nutze `server.listen`, NICHT `app.listen`
server.listen(5000, () => console.log(" Server läuft auf Port 5000"));
