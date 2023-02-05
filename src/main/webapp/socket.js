const messageContainer = document.querySelector(".message-container");
const btn = document.querySelector(".btn");
const inputEl = document.querySelector("input");

const socket = new WebSocket("ws://localhost:8080/chat/websocket/echo");

function showMessage(message, senderId) {
  const div = document.createElement("div");
  const date = new Date();
  const sender = senderId === -1 ? " (Me)" : senderId === 1 ? " (Server)" : "";
  div.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}${sender} : ${message}`;
  messageContainer.appendChild(div);
}

socket.addEventListener("open", (event) => {
  const message = "connection created!";
  showMessage(message, 0);
});

socket.addEventListener("message", (event) => {
  const message = event.data;
  showMessage(message, 1);
});

socket.addEventListener("closed", (event) => {
  const message = "connection closed!";
  showMessage(message, 0);
});

socket.addEventListener("error", (error) => {
  const message = "connection error occured!";
  showMessage(message, 0);
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const message = inputEl.value;
  if (message.length !== 0) {
    socket.send(message);
    showMessage(message, -1);
  }
});
