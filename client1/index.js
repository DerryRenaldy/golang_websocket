let socket = new WebSocket("ws://localhost:8020/ws");
const root = document.getElementById("root");
socket.onopen = () => {
  console.log("Successfully connected");
  // let initialMsg = "Hi Server. Im JS Client";
  // socket.send(initialMsg);
  const stscolumn = document.getElementById("statuscolumn");
  const wsStatusp = document.getElementById("wsStatus");
  const newElement = document.createElement("p");
  newElement.setAttribute("id", "wsStatus");
  newElement.setAttribute("style", "color: #0a9511");
  newElement.innerHTML = "<b>Connected</b>";
  stscolumn.replaceChild(newElement, wsStatusp);

  const newMsgElement = document.createElement("p");
  newMsgElement.setAttribute("class", "sentNotify");
  newMsgElement.innerHTML = `<p><em>Sent: </em> ${initialMsg}</p>`;
  root.appendChild(newMsgElement);
};

socket.onclose = (event) => {
  console.log("Disconnected", event);
  const stscolumn = document.getElementById("statuscolumn");
  const wsStatusp = document.getElementById("wsStatus");
  const newElement = document.createElement("p");
  newElement.setAttribute("id", "wsStatus");
  newElement.setAttribute("style", "color: #ef1316");
  newElement.innerHTML = "<b>Disconnected</b>";
  stscolumn.replaceChild(newElement, wsStatusp);
};

socket.onmessage = (event) => {
  console.log("received msg", event);
  console.log("Data", event["data"]);
  const newElement = document.createElement("p");
  newElement.setAttribute("class", "receiveNotify");
  newElement.innerHTML = `<p><em>Received: </em> ${event["data"]}</p>`;
  root.appendChild(newElement);
};

handleinputmessage = () => {
  var input = document.getElementById("tosndmsg").value;
  console.log(input);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(input);
    const newElement = document.createElement("p");
    newElement.setAttribute("class", "sentNotify");
    newElement.innerHTML = `<p><em>Sent: </em> ${input}</p>`;
    root.appendChild(newElement);
  } else {
    alert("The Connection to the Websocket is not opened");
  }
};
