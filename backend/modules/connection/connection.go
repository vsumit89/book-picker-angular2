package connection

import (
	"context"
	"fmt"
	"log"
	"modules/structure"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//GetConnection is used to get a new connection of mongoDB client
func GetConnection() *mongo.Client {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	Client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Println("Error in connecting to the mongoDB server")
		return nil
	}
	err = Client.Ping(context.TODO(), nil)
	if err != nil {
		log.Println("Error in connecting to the mongoDB server")
		return nil
	}
	return Client
}

//EnterMobile is used to add the phone no of user after login and authentication
func EnterMobile(mobile string) (bool, bool, string) {
	conn := GetConnection()
	ctx := context.TODO()
	defer conn.Disconnect(ctx)
	if conn == nil {
		log.Println("error in connecting to the mongod server")
		//	conn.Disconnect(ctx)
		return false, false, ""
	}
	count, err := countUserByID(ctx, conn, mobile)
	if count == 1 {
		Nickname, err := getNicknameByID(ctx, conn,mobile)
		if err!=nil{
			return false, false,""
		}
		return false, true, Nickname
	}
	data := bson.M{"_id": mobile}
	collection := conn.Database("new-bookpicker").Collection("USERDETAILS")
	_, err = collection.InsertOne(ctx, data)
	if err != nil {
		log.Println("error in inserting the data into the database", err)
		//	conn.Disconnect(ctx)
		return false, false, ""
	}
	return true, false, ""
}

//countUserByID is used
func countUserByID(ctx context.Context, conn *mongo.Client, id string) (int16, error) {
	collection := conn.Database("new-bookpicker").Collection("USERDETAILS")
	pipeline := []interface{}{bson.M{"$match": bson.M{"_id": id}}, bson.M{"$count": "userCount"}}
	result, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		log.Println(err)
		return 0, err
	}
	var Count structure.UserCount
	for result.Next(ctx) {
		err := result.Decode(&Count)
		if err != nil {
			return 0, err
		}
	}
	return Count.Count, nil
}

//EnterBookData is used to add the book data to the mongod server
func EnterBookData(ID string, BookData *structure.BookData) (string, bool) {
	var bookCount structure.BookCount
	connection := GetConnection()
	if connection == nil {
		return "server timeout try again", false
	}
	ctx := context.TODO()
	defer connection.Disconnect(ctx)
	collection := connection.Database("new-bookpicker").Collection("USERDETAILS")
	//pipeline := []interface{}{bson.M{"$unwind":"$books"},bson.M{"$match":bson.M{"$and":[]interface{}{bson.M{"_id":ID},bson.M{"books.isbn":BookData.ISBN}}}}},bson.M{"$count":"userCount"}}}
	pipeline := []interface{}{bson.M{"$unwind": "$books"}, bson.M{"$match": bson.M{"$and": []interface{}{bson.M{"_id": ID}, bson.M{"books.isbn": BookData.ISBN}}}}, bson.M{"$count": "bookCount"}}
	result, err := collection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		log.Println(err)
		return "server timeout try again", false
	}
	for result.Next(ctx) {
		err := result.Decode(&bookCount)
		if err != nil {
			fmt.Println("Err", err)
			return "server timeout try again", false
		}
	}
	fmt.Println(bookCount.Count)
	if bookCount.Count == 0 {
		pipeline := []interface{}{bson.M{"$unwind": "$books"}, bson.M{"$match": bson.M{"_id": ID}}, bson.M{"$count": "bookCount"}}
		result, err := collection.Aggregate(context.TODO(), pipeline)
		if err != nil {
			log.Println("one", err)
			return "server timeout try again", false
		}
		for result.Next(ctx) {
			err := result.Decode(&bookCount)
			if err != nil {
				fmt.Println("Err", err)
				return "server timeout try again", false
			}
		}
		fmt.Println(bookCount.Count)
		if bookCount.Count == 0 {
			filter := bson.M{"_id": ID}
			update := bson.M{
				"$set": bson.M{"books": []interface{}{BookData}},
			}
			_, err := collection.UpdateOne(context.TODO(), filter, update)
			if err != nil {
				log.Println(err)
				return "server timeout try again", false
			}
		} else {
			filter := bson.M{"_id": ID}
			update := bson.M{"$push": bson.M{"books": BookData}}
			_, err = collection.UpdateOne(context.TODO(), filter, update)
			if err != nil {
				log.Println(err)
				return "server timeout try again", false
			}
		}
	} else {
		return "book already exists", false
	}
	return "Successfully added the book", true
}

//AuthenticateID is used to authenticate the ID of the user
func AuthenticateID(ID string) bool {
	conn := GetConnection()
	if conn == nil {
		return false
	}
	ctx := context.TODO()
	defer conn.Disconnect(ctx)
	collection := conn.Database("new-bookpicker").Collection("USERDETAILS")
	count, err := collection.CountDocuments(ctx, bson.M{"_id": ID})
	if err != nil {
		log.Println(err)
		return false
	}
	if count != 1 {
		return false
	}
	return true
}

//GetBook is used to get the Book data from the mongod server
func GetBook(filter structure.GetBook) (*structure.BookData, bool) {
	conn := GetConnection()
	var BookData structure.AddBook
	if conn == nil {
		return nil, false
	}
	ctx := context.TODO()
	defer conn.Disconnect(ctx)
	collection := conn.Database("new-bookpicker").Collection("USERDETAILS")
	pipeline := []interface{}{bson.M{"$unwind": "$books"}, bson.M{"$match": bson.M{"$and": []interface{}{bson.M{"_id": filter.ID}, bson.M{"books.isbn": filter.ISBN}}}}}
	result, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		log.Println(err)
		return nil, false
	}
	fmt.Println("result generated")
	for result.Next(ctx) {
		err := result.Decode(&BookData)
		if err != nil {
			log.Println("Error here", err)
			return nil, false
		}
	}
	fmt.Println(BookData.Book)
	return BookData.Book, true
}

//getNicknameByID is used to get
func getNicknameByID(ctx context.Context, conn *mongo.Client, mobile string)(string, error){
	filter := bson.M{"_id": mobile}
	var Nickname structure.OnlyNickname
	collection := conn.Database("new-bookpicker").Collection("USERDETAILS")
	err := collection.FindOne(ctx, filter).Decode(&Nickname)
	if err != nil {
		log.Println("error in inserting the data into the database", err)
		//	conn.Disconnect(ctx)
		return "",err
	}
	return Nickname.Nickname, nil
}

//EnterNickname is used
func EnterNickname(data structure.Nickname) bool {
	conn := GetConnection()
	ctx := context.TODO()
	defer conn.Disconnect(ctx)
	if conn == nil {
		log.Println("error in connecting to the mongod server")
		return false
	}
	filter := bson.M{"_id": data.Mobile}
	update := bson.M{"$set": bson.M{"nickname": data.Nickname}}
	collection := conn.Database("new-bookpicker").Collection("USERDETAILS")
	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		log.Println("error in inserting the data into the database", err)
		//	conn.Disconnect(ctx)
		return false
	}
	return true
}
