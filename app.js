const express = require("express");
const app = express();
const http  = require("http");
const path = require("path");

const server = http.createServer(app);

app.use(express.static(path.resolve("./public")));
const socket = require("socket.io");
const io = socket(server);

app.get("/", (req,res)=>{
    return res.sendFile("/public/index.html");
})

io.on("connection", (socket)=>{
    socket.on("chatMessage", (msg)=>{
        // console.log("Message",msg);
        io.emit("Message", msg);
        //socket.broadcast.emit('hi');
    })
})

const port = 3000;

server.listen(port);