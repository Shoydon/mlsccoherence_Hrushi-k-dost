package user 
import (
	"fmt"
)

type User struct {
	Name 			string 		`json:"name" bson:"name"`
	Email 			string 		`json:"email" bson:"email"`
	Password 		string 		`json:"password" bson:"password"`
	Mobile 			string 		`json:"mobile" bson:"mobile"`
	Aadhar 			string 		`json:"aadhar" bson:"aadhar"`
	Pan 			string 		`json:"pan" bson:"pan"`
	ImageFilePath 	string 		`bson:"image_file_path"`
	Address 		string 		`json:"address" bson:"address"`
}

func(u User) String() string {
	return fmt.Sprintf("Name: %s | Email: %s | Password: %s | Mobile No: %s | Aadhar Number: %s | Pan number: %s | Image file Path: %s | Address: %s", u.Name, u.Email, u.Password, u.Mobile, u.Aadhar, u.Pan, u.ImageFilePath, u.Address)
}
