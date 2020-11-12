const chatForm = document.getElementById("chat-form");

const chatMessages = document.querySelector(".chat-messages");

const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io();

// join chat room
socket.emit("joinRoom", { username, room });

// get room and users
socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

socket.on("message", ({ message, img }) => {
    console.log(message);

    // outputMessage(message);
    outputMessageNImg(message, img);

    // scrolldown
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    const img = e.target.elements.img.files[0];

    socket.emit("chatMessage", msg);

    // clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

// output message to dom
function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

// output message and img to dom
function outputMessageNImg(message, img) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
    <img src="https://snpi.dell.com/snp/images/products/large/en-us~570-AALKr1/570-AALKr1.jpg" alt="A mouse" width="100" height="100">`;
    document.querySelector(".chat-messages").appendChild(div);
}

// add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}`;
}
