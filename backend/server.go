package main 

import (
	"log"
	"os"
	"context"
	"net/smtp"
	"math/rand"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
	

	"kyc-backend/user"
	"kyc-backend/database"
)

type Server struct {
	url string 
	database database.Database 
	redisClient *redis.Client
}

func NewServer(url string, databaseUrl string) *Server {
	mongoDatabase := database.NewMongoDatabase(databaseUrl)
	mongoDatabase.(*database.Mongo).Connect()
	client := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		Password: "",
		DB: 0,
	})
	return &Server{
		url: url,
		database: mongoDatabase,
		redisClient: client,
	}
}

func (s *Server)loginHandler(c *fiber.Ctx) error {
	var req LoginRequest 
	if err := c.BodyParser(&req); err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}

	user, err := s.database.GetUser(req.Email)
	if err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte(err.Error()))
	}

	val, err := s.redisClient.Get(context.Background(), req.Email).Result()
	if err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte(err.Error()))
	}

	if req.Otp != val {
		resp := Response {
			Success: false,
			Message: "otp did not match",
		}
		return c.Status(fiber.StatusOK).JSON(resp)
	}

	if user.Email != req.Email {
		resp := Response {
			Success: false,
			Message: "email not matching",
		}
		return c.Status(fiber.StatusOK).JSON(resp)
	}

	if user.Password != req.Password {
		resp := Response {
			Success: false,
			Message: "password not matching",
		}
		return c.Status(fiber.StatusOK).JSON(resp)
	}
	resp := Response {
		Success: true,
		Message: "successful!",
	}
	return c.Status(fiber.StatusOK).JSON(resp)
}

func(s *Server) findByAddressHandler(c *fiber.Ctx) error {
	var req FindAddressRequest
	if err := c.BodyParser(&req); err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}

	user, err := s.database.FindByAddress(req.Address)
	if err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))

	}
	if user.Email != req.Email {
		resp := Response {
			Success: false,
			Message: "incorrect email",
		}
		return c.Status(fiber.StatusNotFound).JSON(resp)
	}

	resp := Response {
		Success: true,
		Message: "correct email",
	}
	return c.Status(fiber.StatusOK).JSON(resp)
}

func (s *Server) verifyOTP(c *fiber.Ctx) error {
	var req VerifyOTPRequest 

	if err := c.BodyParser(&req); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	val, err := s.redisClient.Get(context.Background(), req.Email).Result()
	if err != nil {
		log.Println("ERROR: couldn't read data from redis", err)
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if req.Otp != val {
		resp := Response {
			Success: false, 
			Message: "otp didn't match",
		}
		return c.Status(fiber.StatusOK).JSON(resp)
	}
	resp := Response {
		Success: true, 
		Message: "otp matched!",
	}
	return c.Status(fiber.StatusOK).JSON(resp)

}

func(s *Server) sendOTP(c *fiber.Ctx) error {
	email := c.Params("email")

	otp := createOTP()

	go func() {
		err := s.redisClient.Set(context.Background(), email, otp, 0).Err()
		if err != nil {
			log.Println("ERROR: couldn't write to redis", err)
		}
	}()
	if err := sendMail(email, otp); err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.SendStatus(fiber.StatusOK)
}

func (s *Server) signinHandler(c *fiber.Ctx) error {
	var user SignInRequest
	if err := c.BodyParser(&user); err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}
	log.Println("INFO: User:", user)

	val, err := s.redisClient.Get(context.Background(), user.Email).Result()
	if err != nil {
		log.Println("ERROR: couldn't read data from redis", err)
	}

	if val != user.Otp {
		log.Println("ERROR: mobile no not found", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte("otp didn't match"))
	}

	if user.Mobile == "" {
		log.Println("ERROR: mobile no not found", )
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if user.Pan == "" {
		log.Println("ERROR: pan number not found", )
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if user.Aadhar == "" {
		log.Println("ERROR: aadhar number not found", )
		return c.SendStatus(fiber.StatusBadRequest)
	}
	// Saving image file on disk
	// file, err := c.FormFile("image")
	// if err := c.SaveFile(file, fmt.Sprintf("./images/%s", file.Filename)); err != nil {
	// 	log.Println("ERROR:", err)
	// 	return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	// }
	// user.ImageFilePath = fmt.Sprintf("./image/%s", file.Filename)
	
	if err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}
	// Adding user to mongo
	if err := s.database.AddUser(SignInRequestToUser(&user)); err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte(err.Error()))
	}

	return c.Status(fiber.StatusCreated).Send([]byte("created user"))
}

type LoginRequest struct {
	Email 		string 	`json:"email"`
	Password 	string 	`json:"password"`
	Address 	string 	`json:"address"`
	Otp 		string 	`json:"otp"`
}

type Response struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}

type FindAddressRequest struct {
	Address string `json:"address"`
	Email 	string `json:"email"`
}

func createOTP() string {
	const charset = "1234567890"
	length := 6

	var otp string 
	for i := 0; i < length; i++ {
		index := rand.Intn(len(charset))
		otp += string(charset[index])
	}
	return otp
}

func sendMail(email, otp string) error {
	from := os.Getenv("EMAIL_ID")
	password := os.Getenv("PASSWORD")
	to := []string{email}
	smtpServer := "smtp.gmail.com"

	message := "OTP for verification\r\n" + "OTP: " + otp + "\r\n" + 
	"\r\n"
	auth := smtp.PlainAuth("", from, password, smtpServer)

	err := smtp.SendMail(smtpServer + ":587", auth, from, to, []byte(message))
	if err != nil {
		log.Println("ERROR: couldn't send email:", err)
		return err
	}
	log.Println("INFO: email sent successfully")
	return nil
}

func SignInRequestToUser(data *SignInRequest) user.User {
	return user.User {
		Name: data.Name,
		Email: data.Email,
		Password: data.Password,
		Mobile: data.Mobile, 
		Aadhar: data.Aadhar,
		Pan: data.Pan,
		ImageFilePath: data.ImageFilePath,
		Address: data.Address,
	}
}

type VerifyOTPRequest struct {
	Otp string `json:"otp"`
	Email string `json:"email"`
}

type SignInRequest struct {
	Name 			string 		`json:"name" bson:"name"`
	Email 			string 		`json:"email" bson:"email"`
	Password 		string 		`json:"password" bson:"password"`
	Mobile 			string 		`json:"mobile" bson:"mobile"`
	Aadhar 			string 		`json:"aadhar" bson:"aadhar"`
	Pan 			string 		`json:"pan" bson:"pan"`
	ImageFilePath 	string 		`bson:"image_file_path"`
	Address 		string 		`json:"address" bson:"address"`
	Otp 			string 		`json:"otp"`
}
