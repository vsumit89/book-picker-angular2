package structure

//Login structure is used for storing parsed information from login /login request
type Login struct {
	Mobile string `json:"mobile" bson:"mobile,omitempty"`
}

//ResponseLogin is used encode the response for /login(POST) request
type ResponseLogin struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
	Nickname string `json:"nickname" bson:"nickname"`
}

//ResponseDefault is used encode the response for /login(POST) request
type ResponseDefault struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
}
//AddBook is
/*type BookData struct {
	ISBN      string `json:"isbn,omitempty" bson:"isbn,omitempty"`
	BookName  string `json:"bookName,omitempty" bson:"bookName,omitempty"`
	Author    string `json:"author,omitempty" bson:"author,omitempty"`
	Edition   int32 `json:"edition,omitempty" bson:"edition,omitempty"`
	Genre     string `json:"genre" bson:"genre,omitempty"`
	Opinion   string `json:"opinion" bson:"opinion,omitempty"`
	Time      int64  `json:"addedTime" bson:"addedTime,omitempty"`
}
*/
//AddBook is the template for the addbook route object
type AddBook struct {
	ID   string    `json:"mobile,omitempty" bson:"_id"`
	Book *BookData `json:"book" bson:"books"`
}

//BookCount is used the template for getting number  of books
type BookCount struct {
	Count int `bson:"bookCount"`
}

//UniqueBook is the book object
type UniqueBook struct {
	Status  bool      `json:"status"`
	Message string    `json:"message"`
	ID      string    `json:"mobile,omitempty" bson:"_id"`
	Book    *BookData `json:"book,omitempty" bson:"books"`
}

//BookData is used as the object for Books in mongod server
type BookData struct {
	ISBN     string     `json:"isbn" bson:"isbn"`
	Name     string     `json:"title" bson:"bookName"`
	Author   []string   `json:"authors" bson:"author"`
	Opinion  string     `json:"description" bson:"description"`
	Genre    string     `json:"genre" bson:"genre"`
	Comments *[]Comment `json:"comments" bson:"comments"`
	Ilink    string     `json:"ilink" bson:"ilink"`
	Time     int64      `json:"time,omitempty" bson:"addedTime"`
	Rating   int16      `json:"rating" bson:"rating"`
}


//Comment is used for the comment template
type Comment struct {
	Nickname string `json:"nickname" bson:"nickname"`
	Text     string `json:"comments" bson:"text,omitempty"`
}

//GetBook is used to get the unique book
type GetBook struct {
	ID   string `json:"mobile" bson:"_id"`
	ISBN string `json:"isbn" bson:"isbn"`
}


//UserCount is used
type UserCount struct{
	Count int16 `bson:"userCount"`
} 

//Nickname  is used
type Nickname struct{
	Mobile string `json:"mobile" bson:"_id"`
	Nickname string `json:"nickname" bson:"nickname"` 
}

//OnlyNickname is used
type OnlyNickname struct{
	Nickname string `json:"nickname" bson:"nickname"`
}