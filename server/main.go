package main

import (
	"log"
	"os"

	"github.com/Manendrav/geoguide/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Print("Error loading .env file")
	}
}

func main() {
	app := fiber.New()

	// Enable CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins:     os.Getenv("CLIENT_ORIGIN"), // your React app URL
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	// This will set up all the routes defined in routes/routes.go
	routes.SetupRoutes(app)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("failed to start: %v", err)
	}
}
