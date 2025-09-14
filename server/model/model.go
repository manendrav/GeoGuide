package models

type Location struct {
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}

// Clean response for frontend
type LocationResponse struct {
	Address string `json:"address"`
	City    string `json:"city"`
	Country string `json:"country"`
}
