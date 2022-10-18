package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func homePage(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("This is home page"))
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	//w.Write([]byte("This is ws endpoint"))
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Got error on upgrader: %v \n", err)
	}

	log.Println("Client Connected")
	ws.WriteMessage(1, []byte("Hi Client"))
	if err != nil {
		log.Println(err)
	}

	// listen indefinitely for new messages coming through on our WebSocket connection
	reader(ws)
}

// reader will listen for new messages being sent to our WebSocket endpoint
func reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		// print out that message for clarity
		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

func prepareEndpoint() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws", wsEndpoint)
}

func main() {
	fmt.Println("Hello World")
	prepareEndpoint()
	log.Fatal(http.ListenAndServe(":8010", nil))
}
