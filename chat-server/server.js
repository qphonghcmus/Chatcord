const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.options("*", cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";
const imgPath =
    "https://snpi.dell.com/snp/images/products/large/en-us~570-AALKr1/570-AALKr1.jpg";

// Run when client connects
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // emit to just user connected
        socket.emit("message", {
            message: formatMessage(botName, "Wellcome to ChatCord!"),
            img: imgPath,
        });

        // broadcast when a user connects (except that user)
        socket.broadcast.to(user.room).emit("message", {
            message: formatMessage(botName, `${username} has joined the chat`),
            img: imgPath,
        });
        // send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    // Listen for chat message
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", {
            message: formatMessage(user.username, msg),
            img: imgPath,
        });
    });

    // run when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            // emit to all user
            io.to(user.room).emit("message", {
                message: formatMessage(
                    botName,
                    `${user.username} has left the chat`
                ),
                img: imgPath,
            });
            // send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
