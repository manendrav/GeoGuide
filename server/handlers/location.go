package handlers

import (
	"fmt"
	"net/url"

	"github.com/Manendrav/geoguide/model"
	"github.com/gofiber/fiber/v2"
)

func GetUserLocationHandler(c *fiber.Ctx) error {
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

func GetLocationHandler(c *fiber.Ctx) error {
	location := struct { // Anonymous struct instantiation
		Loc string `json:"loc"`
	}{}

	if err := c.BodyParser(&location); err != nil {
		fmt.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	encodedLoc := url.QueryEscape(location.Loc)

	result, err := GetCoordinates(encodedLoc)
	if err != nil {
		return c.Status(500).SendString("Error fetching the Coordinates")
	}

	return c.Status(200).JSON(result)
}

func AddressAutocompleteHandler(c *fiber.Ctx) error {
	// get loc string from request
	location := struct { 						
		Loc string `json:"loc"`
	}{}

	err := c.BodyParser(&location)				//TODO: You have to create request cancel feature too (Fiber doesnt automatically cancle previous request)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "cannot parse JSON",
		})
	}

	encodedLoc := url.QueryEscape(location.Loc)

	// send that string to service
	result, err := GetAutoCompleteAddress(encodedLoc)
	if err != nil {
		return c.Status(500).SendString("Error fetching data")
	}
	
	// return the response
	return c.Status(200).JSON(result)
}
