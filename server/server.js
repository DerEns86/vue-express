const express = require("express");
const cors = require("cors");
const http = require("http");
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:5137"],
  },
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
