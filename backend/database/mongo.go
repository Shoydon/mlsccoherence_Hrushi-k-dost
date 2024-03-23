package database 

import (
	"kyc-backend/user"
	"errors"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)
type Mongo struct {
	url string 
	client *mongo.Client
}

func NewMongoDatabase(url string) Database {
	return &Mongo {
		url: url,
	}
}

func (m *Mongo) Connect() error {
	if m.url == "" {
		return errors.New("URL NOT SET")
	}
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(m.url))
	if err != nil {
		return err
	}
	m.client = client
	log.Println("INFO: CONNECTED TO MONGO DB")
	return nil
}

func (m *Mongo) getCollection(databaseName, collectionName string) *mongo.Collection{
	return m.client.Database(databaseName).Collection(collectionName)
}

func(m *Mongo) FindByAddress(address string) (*user.User, error) {
	filter := bson.M{"address": address}

	userCollection := m.getCollection("DEFI", "users")
	result := userCollection.FindOne(context.Background(), filter)
	
	var user *user.User
	err := result.Decode(user)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (m *Mongo) AddUser(user user.User) error {
	userCollection := m.getCollection("DEFI", "users")
	_, err := userCollection.InsertOne(context.Background(), user)
	if err != nil {
		return err
	}
	return nil
}

func(m *Mongo) GetUser(address string) (*user.User,error) {
	userCollection := m.getCollection("DEFI", "users")
	res := userCollection.FindOne(context.Background(), address)

	var user *user.User
	err := res.Decode(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}
