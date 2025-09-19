package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	models "github.com/Manendrav/geoguide/model"
)

func GetKey() string {
	key := os.Getenv("GEOAPIFY_KEY")
	if key == "" {
		log.Fatal("KEY is not set")
	}
	return key
}

type GeoapifyResponse struct {
	Results []models.LocationResponse `json:"results"`
}

// Function to handle all the API responses
func ResponseHandler(res *http.Response) (*models.LocationResponse, error) {
	// Read body
	data, err := io.ReadAll(res.Body) 	// io.ReadAll reads all bytes from that stream until EOF (end of file). (Because response.Body is a stream of bytes like: [011, 34, 25, ...])
	if err != nil {
		return nil, err
	}

	// Unmarshal JSON
	var result GeoapifyResponse 		// why i need GeoapifyResponse? the reponse comes something like {"results":[{"lat":...}]} so we need to unmarshal it into a struct that has Results field which is a slice of LocationResponse
	if err := json.Unmarshal(data, &result); err != nil {
		return nil, err
	}

	if len(result.Results) == 0 {
		return nil, fmt.Errorf("no results are found")
	}

	response := result.Results[0]
	return &response, nil
}

// Get the location detailes based on lat, lon
func GetLocation(lat, lon float64) (*models.LocationResponse, error) {
	apiKey := GetKey()

	// Construct URL
	URL := fmt.Sprintf("https://api.geoapify.com/v1/geocode/reverse?lat=%f&lon=%f&type=postcode&format=json&apiKey=%s", lat, lon, apiKey)

	// Make request
	response, err := http.Get(URL)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close() 		//! Ensure the body is closed after function ends, Otherwise it can lead to memory leaks

	data, err := ResponseHandler(response)
	if err != nil {
		return nil, err
	}

	return data, nil
}

// function to get location detailes from location name
func GetSearchedLocation(location string) (*models.LocationResponse, error) {
	apiKey := GetKey()

	// URL
	URL := fmt.Sprintf("https://api.geoapify.com/v1/geocode/search?text=%s&format=json&apiKey=%s", location, apiKey)

	// Make request
	response, err := http.Get(URL)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	data, err := ResponseHandler(response)
	if err != nil {
		return nil, err
	}

	return data, nil
}

func GetAutoCompleteAddress(location string) ([]map[string]interface{}, error) {
	apiKey := GetKey()

	result := struct {
		Results []map[string]interface{} `json:"results"`
	}{}

	// Url define
	URL := fmt.Sprintf("https://api.geoapify.com/v1/geocode/autocomplete?text=%s&format=json&limit=5&apiKey=%s", location, apiKey)

	// get the response
	res, err := http.Get(URL)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	data, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	// Unmarshal the response
	if err := json.Unmarshal(data, &result); err != nil {
		return nil, err
	}

	return result.Results, nil
}

func GetService(lat, lon float64, loc string) ([]map[string]interface{}, error) {
	apiKey := GetKey()

	result := struct {
		Features []map[string]interface{} `json:"features"`
	}{}
	
	// define Url
	URL := fmt.Sprintf("https://api.geoapify.com/v2/places?categories=%s&filter=circle:%f,%f,5000&bias=proximity:%f,%f&limit=20&apiKey=%s", loc, lon, lat, lon, lat, apiKey)
	
	// get the response from url
	response, err := http.Get(URL)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	data, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}	
	
	// unmarshal the response
	if err := json.Unmarshal(data, &result); err != nil {
		return nil, err
	}

	if len(result.Features) == 0 {
		return nil, err
	}

	// return the result
	return result.Features, nil
}
