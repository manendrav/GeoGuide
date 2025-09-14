package handlers

import (
	"fmt"

	"github.com/Manendrav/geoguide/model"
	"github.com/gofiber/fiber/v2"
)

func GetLocationHandler(c *fiber.Ctx) error {
	location := models.Location{}

	// Parse body
	if err := c.BodyParser(&location); err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	lat := location.Latitude
	lon := location.Longitude

	// Call service
	result, err := GetLocation(lat, lon)
	if err != nil {
		return c.Status(500).SendString("Error fetching data")
	}

	// Return response
	return c.Status(200).JSON(result)
}
