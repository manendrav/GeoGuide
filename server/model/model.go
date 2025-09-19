package models

type Location struct {
	Latitude  float64 `json:"lat,omitempty"`
	Longitude float64 `json:"lon,omitempty"`
	Location  string  `json:"loc,omitempty"`
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
	County    string  `json:"county,omitempty"` 	// "omitempty" means that if the field is empty, it will not be included in the JSON output
	Postcode  string  `json:"postcode"`
	Formatted string  `json:"formatted"`
}
