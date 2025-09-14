package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	models "github.com/Manendrav/geoguide/model"
)

type GeoapifyResponse struct {
    Results []models.LocationResponse `json:"results"`
}

func GetLocation(lat, lon string) (*models.LocationResponse, error) { // (map[string]interface{}, error) these are return types, map[string]interface{} -> "Keys are strings, but values can be anything."
	apiKey := os.Getenv("GEOAPIFY_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("key is not defined")
	}

	// Construct URL
	URL := fmt.Sprintf("https://api.geoapify.com/v1/geocode/reverse?lat=%s&lon=%s&type=postcode&format=json&apiKey=%s", lat, lon, apiKey)

	// Make request
	response, err := http.Get(URL)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close() 				//! Ensure the body is closed after function ends, Otherwise it can lead to memory leaks

	// fmt.Println("res:", response.Body)     	//* If you can't access data like this, Printing it directly only shows you the Go struct pointer, The actual data is a stream of bytes coming from the network. thats why you need io.ReadAll

	// Read body
	data, err := io.ReadAll(response.Body) 		// io.ReadAll reads all bytes from that stream until EOF (end of file). (Because response.Body is a stream of bytes like: [011, 34, 25, ...])
	if err != nil {
		return nil, err
	}

	// Unmarshal JSON
	var apiResp GeoapifyResponse							// why i need GeoapifyResponse? the reponse comes something like {"results":[{"lat":...}]} so we need to unmarshal it into a struct that has Results field which is a slice of LocationResponse
    if err := json.Unmarshal(data, &apiResp); err != nil {
        return nil, err
    }

    result := apiResp.Results[0]

    return &result, nil
}
