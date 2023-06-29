import createMessageElement from "./lib/createMessageElement";

let username = getUsername();
let messages = [];
let users = [];

document.getElementById("username-input").value = username;

const socket = io();

socket.on("connection", () => {
    socket.emit("user connected", username);
});

socket.on("chat message", (collection) => {
    messages = collection;
    renderMessages(messages);
});

socket.on("user connected", (username) => {
    const container = document.getElementById("messages");
    users.push(username);
});

function sendMessage() {
    const str = document.getElementById("message-input").value;
    if (str !== "") {
        const message = structureMessage(str);
        socket.emit("chat message", message);
    }
}

function structureMessage(text = "I forgot to type") {
    return {
        text: text,
        username,
        timeStamp: Date.now(),
    };
}

function renderMessages(collection) {
    const container = document.getElementById("messages");
    const messages = collection.map((m) => {
        return createMessageElement(m);
    });

    container.innerHTML = "";

    messages.forEach((msg) => {
        container.insertAdjacentHTML("beforeend", msg);
    });
}

function getUsername() {
    const user = localStorage.getItem("username") || "Annonymous";
    return user;
}

function setUsername(value) {
    localStorage.setItem("username", String(value));
    username = value;
}

const changeUsernameButton = document.getElementById("username-button");
changeUsernameButton.addEventListener("click", () => {
    const usernameField = document.getElementById("username-input");
    setUsername(usernameField.value);
});

const sendMessageButton = document.getElementById("message-button");
sendMessageButton.addEventListener("click", (e) => {
    sendMessage();
    document.getElementById("message-input").value = "";
});
