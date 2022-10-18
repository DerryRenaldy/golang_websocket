package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/DerryRenaldy/golang_websocket/service"
	"github.com/gorilla/websocket"
)

var WsUpgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// Implementation for http
func Rootfunc(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "Success", "desc": "RootPageEndpoint Hitted"})
	fmt.Println(r)
}

func GetWsConn(w http.ResponseWriter, r *http.Request) {
	log.Println(r)
	fmt.Println("########## Request Headers ##########")
	for h := range r.Header {
		fmt.Printf("%s : %s \n", h, r.Header[h])
	}
	log.Println("Received New Client Connection")
	ws, err := WsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Panicf("Got some error in GetWsConn: %v \n", err)
		return
	}
	log.Println("Client Upgrade to WS Success")
	go service.WriteMsg(ws)
	go service.ReadAndEcho(ws)
}
