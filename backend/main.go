package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	app := fiber.New()
	s := NewServer(":8000", "mongodb://localhost:27017")
	app.Use(cors.New())
	// app.Use(cors.Config{
	// 	AllowOrigins: "*",
	// })

	app.Post("/login", s.loginHandler)
	app.Post("/signin", s.signinHandler)
	app.Get("/sendOTP/:email", s.sendOTP)
	app.Post("/verifyOTP", s.verifyOTP)
	if err := app.Listen(s.url); err != nil {
		log.Fatal(err)
	}
}

