package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	s := NewServer(":8000", "mongodb://localhost:27017")
	app.Use(cors.New())
	// app.Use(cors.Config{
	// 	AllowOrigins: "*",
	// })

	app.Post("/login", s.loginHandler)
	app.Post("/signin", s.signinHandler)
	if err := app.Listen(s.url); err != nil {
		log.Fatal(err)
	}
}

