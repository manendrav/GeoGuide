import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Map from "../components/Map";
import UserLocationDetailes from "../components/UserLocationDetails";
import { ServiceCategory } from "../components/ServiceCategory";
import { Sidebar } from "../components/layout/Sidebar";
import { LocationDetails } from "../components/LocationDetails";
import {
  getRouteDetails,
  getSearchedLocationDetails,
} from "../services/locationService";
import { useSearchParams } from "react-router-dom";

export default function Explore() {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyServices, setNearbyServices] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchedLocationData, setSearchedLocationData] = useState(null);

  const [searchParams] = useSearchParams();
  const searchedLocation = searchParams.get("search");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchRouteDetails = async ({ end_lat, end_lon }) => {
    const payload = {
      start_lat: userLocation.latitude,
      start_lon: userLocation.longitude,
      end_lat: end_lat,
      end_lon: end_lon,
    };

    if (isOpen == true) toggleSidebar();

    try {
      const data = await getRouteDetails(payload);
      setRouteData(data);
    } catch (error) {
      console.error("Error fetching route details:", error);
    }
  };

  const fetchSearchedLocationData = async () => {
    if (!searchedLocation?.trim()) return;
    const payload = {
      loc: searchedLocation,
    };

    try {
      const response = await getSearchedLocationDetails(payload);
      if (response) setSearchedLocationData(response);
      setUserLocation({
        latitude: response?.lat,
        longitude: response?.lon,
      });
    } catch (error) {
      console.error("Error fetching searched location details:", error);
    }
  };

  useEffect(() => {
    fetchSearchedLocationData();
  }, [searchedLocation]);

  //* ---------> Fetch User from Local Storage <--------- *//
  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("geo-user"));
    if (existingUser && existingUser.userLocation) {
      setUserLocation({
        latitude: existingUser.userLocation.lat,
        longitude: existingUser.userLocation.lon,
      });
    } else {
      setUserLocation(false); // Trigger geolocation fetch
    }
  }, []);

  //* ---------> Get User Current Location <--------- *//
  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    };

    const error = (err) => {
      // Fallback if user denies or an error occurs
      setUserLocation({ latitude: 28.6448, longitude: 77.216721 });
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, [userLocation === false]);

  //* ---------> Local Storage <--------- *//
  useEffect(() => {
    if (!userLocation) return;

    const existingUser = JSON.parse(localStorage.getItem("geo-user"));
    if (existingUser) return; // If user data already exists, do not overwrite

    const payload = {
      userId: uuidv4(),
      isVisited: true,
      userLocation: {
        lat: userLocation?.latitude,
        lon: userLocation?.longitude,
      },
      searchedLocations: [],
      deviceType: /Mobi|Android/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop",
      browserLanguage: navigator.language || "en-US",
      themePreference:
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    };

    localStorage.setItem("geo-user", JSON.stringify(payload));
  }, [userLocation === false]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col min-h-[calc(100vh_-_theme(spacing.16))]">
        <div className="my-2">
          <ServiceCategory
            setNearbyServices={setNearbyServices}
            location={userLocation}
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2 w-full">
          <div className="grid relative gap-4">
            <div className="flex justify-center items-center rounded-xl z-[0] h-screen overflow-hidden border-2  w-full">
              <Map
                location={userLocation}
                nearbyServices={nearbyServices}
                setLocationData={setLocationData}
                toggleSidebar={toggleSidebar}
                fetchRouteDetails={fetchRouteDetails}
                routeData={routeData}
              />
            </div>
          </div>

          {/* User Ki detailes */}
          <div>
            <UserLocationDetailes location={userLocation} />
          </div>
        </div>

        <div>
          <Sidebar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            title="Details"
          >
            {locationData && Object.keys(locationData).length > 0 ? (
              <LocationDetails
                locationData={locationData[0].properties}
                fetchRouteDetails={fetchRouteDetails}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="loader"></span>
              </div>
            )}
          </Sidebar>
        </div>
      </main>
    </div>
  );
}
