package main

import (
	"fmt"
	"modules/routes"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	fmt.Println("Starting Application")
	r := mux.NewRouter()
	r.HandleFunc("/login", routes.Login).Methods("POST", "OPTIONS")
	r.HandleFunc("/addBook", routes.AddBookRoute).Methods("POST", "OPTIONS")
	r.HandleFunc("/getBook", routes.GetBook).Methods("POST", "OPTIONS")
	r.HandleFunc("/addNickname",routes.AddNickname).Methods("POST","OPTIONS")
	http.ListenAndServe(":6000", r)
}
