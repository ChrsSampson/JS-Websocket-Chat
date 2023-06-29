const express = require("express");
const http = require("http");
const Storage = require("./storage");
const { Server, httpServer } = require("socket.io");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname + "/static")));

const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/index.html"));
});

const msgs = new Storage("messages");

io.on("connection", (socket) => {
    console.log("connection", socket);
    socket.emit("chat message", msgs.getAll());
    socket.broadcast.emit("user connected", "New User Connected");

    socket.on("chat message", (msg) => {
        const messages = msgs.add(msg);
        // send messages back to sender
        socket.emit("chat message", messages);
        // broadcast to everyone
        socket.broadcast.emit("chat message", messages);
    });
});

server.listen(port, () => {
    console.log("listening on " + port);
});
