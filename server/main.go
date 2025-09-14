package main

import (
	"log"

	"github.com/Manendrav/geoguide/routes"
	"github.com/gofiber/fiber/v2"
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

    // This will set up all the routes defined in routes/routes.go
	routes.SetupRoutes(app)

    // Start server
	log.Fatal(app.Listen(":3000")) // log.Fatal is used to log the error if the server fails to start
}

/* 
    How this application works:
    Start -> main.go (initializes the server and routes)
            -> routes/routes.go (defines the routes and links them to handlers)
                -> handlers/location.go (handles the request, calls services)       // It sends data to service.go and gets a response
                -> handlers/service.go (contains business logic, calls models if needed) //* API calls made here and response sent back to handler
                    -> models/model.go (defines data structures)    // this is used in service.go to structure the response
    
    Response flows back in reverse order.
*/
