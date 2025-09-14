package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

func GetLocation(lat, lon string) (map[string]interface{}, error) { // (map[string]interface{}, error) these are return types, map[string]interface{} -> "Keys are strings, but values can be anything."
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
	defer response.Body.Close() //! Ensure the body is closed after function ends, Otherwise it can lead to memory leaks

	// Read body
	data, err := io.ReadAll(response.Body) // io.ReadAll reads all bytes from that stream until EOF (end of file). (Because response.Body is a stream of bytes like: [011, 34, 25, ...])
	if err != nil {
		return nil, err
	}

	// Unmarshal
	var result map[string]interface{}
	if err := json.Unmarshal(data, &result); err != nil {
		return nil, err
	}

	return result, nil
}
