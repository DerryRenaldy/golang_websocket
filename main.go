package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/DerryRenaldy/golang_websocket/server"
)

func main() {
	http.HandleFunc("/", server.Rootfunc)
	http.HandleFunc("/ws", server.GetWsConn)
	fmt.Println("Server is up and running on port 8020")

	log.Fatal(http.ListenAndServe(":8020", nil))
}
