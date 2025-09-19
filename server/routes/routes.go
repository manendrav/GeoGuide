package routes

import (
	"github.com/Manendrav/geoguide/handlers"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Health check
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Server is running 🚀")
	})

	// User Location
	app.Post("/userlocation", handlers.GetUserLocationHandler)

	// Location info
	app.Post("/searchedlocation", handlers.GetSearchedLocationHandler)

	// autocomplete search
	app.Post("/addressautocomplete", handlers.AddressAutocompleteHandler)

	// Get nearby Services detailes 
	app.Post("/services/:service", handlers.GetServicesHandler)

	// Get service detailes
	app.Get("/service/details/:id", handlers.GetServiceDetailsHandler)

	// Get Turn-by-Turn navigation or Directions instructions
	app.Post("/service/route", handlers.GetRouteHandler)
}

/* 
	-> User allow location permisions on frontend then we get {lat, lon} and send User Location from {/userLocation}

	-> User can Enter any Location in search bar we get {loc} and send Location from {/location} send lat, lon of that location

	-> For autocomplete we can use {/autocomplete/:input} here we send list of locations matching the input

	-> we can show specific service from {/service/:category} here we send all the servicces nearby under 5 km radius like hospitals and resturents

	-> Now if user clicks on specific hospital we can show details from {/service/details/:id} here we send all the details of that specific hospital

	-> Now if user clicks on direction button we can show directions from {/service/direction/:id} here we send directions to that specific hospital form user location

*/