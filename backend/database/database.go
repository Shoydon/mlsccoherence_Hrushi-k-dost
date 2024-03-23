package database 

import (
	"kyc-backend/user"
)

type Database interface {
	AddUser(user.User) error
	GetUser(string) (*user.User, error)
	FindByAddress(string) (*user.User, error)
}
