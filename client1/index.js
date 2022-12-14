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
  var receiveBox = docuemnt.getElementById("receive-box");
  console.log("received msg", event);
  console.log("Data", event["data"]);
  const newElement = document.createElement("p");
  newElement.setAttribute("class", "receiveNotify");
  newElement.innerHTML = `<p><em>Received: </em> ${event["data"]}</p>`;
  receiveBox.appendChild(newElement);
};

handleinputmessage1 = () => {
  var input1 = document.getElementById("tosndmsg").value;
  var msgbox = document.getElementById("msg-box");

  console.log(input1);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(input1);
    const newElement = document.createElement("p");
    newElement.setAttribute("class", "sentNotify");
    newElement.innerHTML = `<p><em>Client 1: </em> ${input1}</p>`;
    msgbox.appendChild(newElement);
  } else {
    alert("The Connection to the Websocket is not opened");
  }
};

handleinputmessage2 = () => {
  var input2 = document.getElementById("tosndmsg2").value;
  var msgbox = document.getElementById("msg-box");

  console.log(input2);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(input2);
    const newElement = document.createElement("p");
    newElement.setAttribute("class", "sentNotify2");
    newElement.innerHTML = `<p><em>Client 2: </em> ${input2}</p>`;
    msgbox.appendChild(newElement);
  } else {
    alert("The Connection to the Websocket is not opened");
  }
};

handledeleteinputmessage = () => {
  document.querySelectorAll(".sentNotify").forEach((el) => el.remove());
  document.querySelectorAll(".receiveNotify").forEach((el) => el.remove());
  console.log("deleted");
};
