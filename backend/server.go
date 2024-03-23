package main 

import (
	"log"
	"fmt"

	"github.com/gofiber/fiber/v2"
	

	"kyc-backend/user"
	"kyc-backend/database"
)

type Server struct {
	url string 
	database database.Database 
}

func NewServer(url string, databaseUrl string) *Server {
	mongoDatabase := database.NewMongoDatabase(databaseUrl)
	mongoDatabase.(*database.Mongo).Connect()
	return &Server{
		url: url,
		database: mongoDatabase,
	}
}

func (s *Server)loginHandler(c *fiber.Ctx) error {
	var req LoginRequest 
	if err := c.BodyParser(&req); err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}

	user, err := s.database.GetUser(req.Address)
	if err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte(err.Error()))
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

func (s *Server) signinHandler(c *fiber.Ctx) error {
	var user user.User
	if err := c.BodyParser(&user); err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}
	log.Println("INFO: User:", user)

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
	file, err := c.FormFile("image")
	if err := c.SaveFile(file, fmt.Sprintf("./images/%s", file.Filename)); err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}
	user.ImageFilePath = fmt.Sprintf("./image/%s", file.Filename)
	
	if err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}
	// Adding user to mongo
	if err := s.database.AddUser(user); err != nil {
		log.Println("ERROR:", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte(err.Error()))
	}

	return c.Status(fiber.StatusCreated).Send([]byte("created user"))
}

type LoginRequest struct {
	Email 		string 	`json:"email"`
	Password 	string 	`json:"password"`
	Address 	string 	`json:"address"`
}

type Response struct {
	Success bool `json:"success"`
	Message string `json:"message"`
}

type FindAddressRequest struct {
	Address string `json:"address"`
	Email 	string `json:"email"`
}
