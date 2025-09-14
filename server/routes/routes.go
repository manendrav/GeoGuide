package routes

import (
	"github.com/Manendrav/geoguide/handlers"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Health check
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Service Locator API is running 🚀")
	})

	// Location APIs
	app.Post("/userlocation", handlers.GetLocationHandler)

	// Later you can add:
	// app.Get("/services", handlers.GetNearbyServicesHandler)
}
