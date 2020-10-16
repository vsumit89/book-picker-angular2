package routes

import (
	"encoding/json"
	"fmt"
	"modules/connection"
	"modules/structure"
	"net/http"
	"os"
	"strings"
	"time"
	firebase "firebase.google.com/go"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
)

func setupResponse(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")
}

//Login is used here
func Login(rw http.ResponseWriter, req *http.Request) {
	setupResponse(rw, req)
	if req.Method == "OPTIONS" {
		return
	}
	var ReqBody structure.Login
	var Response structure.ResponseLogin
//	token := extractToken(req)
/*	if !verifyToken(token) {
		Response.Status = false
		Response.Message = "error in decoding the request body"
		if !sendLoginResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}*/
	err := json.NewDecoder(req.Body).Decode(&ReqBody)
	if err != nil {
		Response.Status = false
		Response.Message = "error in decoding the request body"
		if !sendLoginResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	var flag1, flag2 bool
	flag1, flag2, Response.Nickname = connection.EnterMobile(ReqBody.Mobile)
	if flag1 == flag2 {
		Response.Status = false
		Response.Message = "Server unavailable"
		if !sendLoginResponse(rw, http.StatusOK, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	Response.Status = true
	Response.Message = "Successfully logged in"
	if !sendLoginResponse(rw, http.StatusOK, Response) {
		fmt.Println("Error in sending the response")
		return
	}
	return
}

func sendLoginResponse(rw http.ResponseWriter, header int, body structure.ResponseLogin) bool {
	rw.WriteHeader(header)
	err := json.NewEncoder(rw).Encode(body)
	if err != nil {
		fmt.Println("Error in sending the Response")
		return false
	}
	return true
}

//verifyToken is used to verify the token from the firebase
func verifyToken(token string) bool {
	opt := option.WithCredentialsFile(os.Getenv("GOOGLE_APPLICATION_CREDENTIALS"))
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		fmt.Printf("error initializing app: %v\n", err)
		return false
	}
	ctx := context.Background()
	client, err := app.Auth(ctx)
	if err != nil {
		return false
	}
	_, err = client.VerifyIDToken(ctx, token)
	if err != nil {
		return false
	}
	return true
}

//extractToken is used to extract the token
func extractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	fmt.Println(bearToken)
	//normally Authorization the_token_xxx
	strArr := strings.Split(bearToken, " ")
	return strArr[1]
}

//AddBookRoute is used
func AddBookRoute(rw http.ResponseWriter, req *http.Request) {
	setupResponse(rw, req)
	if req.Method == "OPTIONS" {
		return
	}
	var RequestData structure.AddBook
	var Response structure.ResponseDefault
	err := json.NewDecoder(req.Body).Decode(&RequestData)
	if err != nil {
		Response.Status = false
		Response.Message = "Error in adding the data"
		fmt.Println("Error :=", err)
		if !DefaultResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	/*	token := extractToken(req)
		if !verifyToken(token) {
			Response.Status = false
			Response.Message = "error in decoding the request body"
			if !sendLoginResponse(rw, http.StatusUnauthorized, Response) {
				fmt.Println("Error in sending the response")
				return
			}
			return
		}
	*/
	if !connection.AuthenticateID(RequestData.ID) {
		Response.Status = false
		Response.Message = "user Invalid"
		if !DefaultResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}

	var flag bool
	RequestData.Book.Time = time.Now().Unix()
	Response.Message, flag = connection.EnterBookData(RequestData.ID, RequestData.Book)
	if !flag {
		Response.Status = false
		Response.Message = "Error in adding the Data"
		if !DefaultResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	Response.Status = true
	Response.Message = "Successfully added the book the Data"
	if !DefaultResponse(rw, http.StatusOK, Response) {
		fmt.Println("Error in sending the response")
		return
	}
	return
}

//GetBook is used to a unique book from the mongo database server
func GetBook(rw http.ResponseWriter, req *http.Request) {
	setupResponse(rw, req)
	if req.Method == "OPTIONS" {
		return
	}
	var Request structure.GetBook
	var Response structure.UniqueBook
	err := json.NewDecoder(req.Body).Decode(&Request)
	if err != nil {
		Response.Status = false
		Response.Message = "Error in adding the data"
		fmt.Println("Error :=", err)
		if !getBookResponse(rw, 401, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	fmt.Println(Request)
	/*	token := extractToken(req)
		if !verifyToken(token) {
			Response.Status = false
			Response.Message = "error in decoding the request body"
			if !getBookResponse(rw, http.StatusUnauthorized, Response) {
				fmt.Println("Error in sending the response")
				return
			}
			return
		}
	*/
	if !connection.AuthenticateID(Request.ID) {
		Response.Status = false
		Response.Message = "user Invalid"
		if !getBookResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	fmt.Println("Authentication done")
	var flag bool
	Response.Book, flag = connection.GetBook(Request)
	if !flag {
		Response.Status = false
		Response.Message = "server unavailable"
		if !getBookResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	if Response.Book == nil {
		Response.Status = false
		Response.Message = "invalid ISBN"
		if !getBookResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	fmt.Println("GetBook done!!!")
	Response.Status = true
	Response.Message = "Successfully sent the book"
	Response.Book.Time = 0
	if !getBookResponse(rw, http.StatusOK, Response) {
		fmt.Println("Error in sending the response")
		return
	}
}

//getBookResponse is used to send the response for the /getBook
func getBookResponse(rw http.ResponseWriter, header int, body structure.UniqueBook) bool {
	rw.WriteHeader(header)
	err := json.NewEncoder(rw).Encode(body)
	if err != nil {
		fmt.Println("Error in sending the Response")
		return false
	}
	return true
}

//AddNickname is used for /addNickname which is used to add the nickname of the user
func AddNickname(rw http.ResponseWriter, req *http.Request) {
	setupResponse(rw, req)
	if req.Method == "OPTIONS" {
		return
	}
	/*	token := extractToken(req)
	if !verifyToken(token) {
		Response.Status = false
		Response.Message = "error in decoding the request body"
		if !getBookResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	*/
	var Request structure.Nickname
	var Response structure.ResponseDefault
	err := json.NewDecoder(req.Body).Decode(&Request)
	if err != nil {
		Response.Status = false
		Response.Message = "Server unavailable"
		fmt.Println("Error :=", err)
		if !DefaultResponse(rw, 401, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	if !connection.AuthenticateID(Request.Mobile) {
		Response.Status = false
		Response.Message = "user Invalid"
		if !DefaultResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	if !connection.EnterNickname(Request){
		Response.Status = false
		Response.Message = "server unavailable, Try again"
		if !DefaultResponse(rw, http.StatusUnauthorized, Response) {
			fmt.Println("Error in sending the response")
			return
		}
		return
	}
	Response.Status = true
	Response.Message = "succesfully added nickname"
	if !DefaultResponse(rw, http.StatusOK, Response) {
		fmt.Println("Error in sending the response")
		return
	}
}

//DefaultResponse is used
func DefaultResponse(rw http.ResponseWriter, header int, body structure.ResponseDefault) bool {
	rw.WriteHeader(header)
	err := json.NewEncoder(rw).Encode(body)
	if err != nil {
		fmt.Println("Error in sending the Response")
		return false
	}

	return true
}
