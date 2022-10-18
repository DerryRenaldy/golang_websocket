package service

import (
	"fmt"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

func ReadAndEcho(ws *websocket.Conn) {
	for {
		msgType, msg, err := ws.ReadMessage()
		if err != nil {
			log.Printf("Got some error: %v \n", err)
			return
		}

		log.Printf("The Received Message type is %v \n", msgType)
		log.Printf("The Received Message is %v \n", string(msg))
		log.Println("Echo the same message")
		// echo the same msg
		if err := ws.WriteMessage(msgType, []byte(fmt.Sprintf("Echo: %s", msg))); err != nil {
			log.Printf("Got some error in readAndEcho: %v \n", err)
		}
	}
}

func WriteMsg(ws *websocket.Conn) {
	for {
		time.Sleep(time.Second * 120)
		log.Println("Writing the message to the client")
		nowTime := time.Now()
		msg := nowTime.UTC()
		if err := ws.WriteMessage(1, []byte(msg.String())); err != nil {
			log.Printf("Got some error in writeMsg")
			return
		}
	}
}
