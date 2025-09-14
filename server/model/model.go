package models

type Location struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lon"`
}

// Clean response for frontend
type LocationResponse struct {
	Lat       float64 `json:"lat"`
	Lon       float64 `json:"lon"`
	City      string  `json:"city"`
	State     string  `json:"state"`
	StateID   string  `json:"state_code"`
	Country   string  `json:"country"`
	CountryID string  `json:"country_code"`
	Postcode  string  `json:"postcode"`
	Formatted string  `json:"formatted"`
}
