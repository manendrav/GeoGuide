import { useEffect, useState } from "react";
import { getUserLocationDetailes } from "../services/locationService";

const UserLocationDetails = ({ location }) => {
  const [userLocationData, setUserLocationData] = useState(null);
  const [permission, setPermission] = useState("unknown");

  const payload = {
    lat: location?.latitude,
    lon: location?.longitude,
  };

  //* ---------> Fetch User Location Details <--------- *//
  async function fetchUserData(location) {
    if (location) {
      try {
        const result = await getUserLocationDetailes(payload);
        if (result) setUserLocationData(result);
      } catch (error) {
        console.error("Error fetching user location data:", error);
      }
    }
  }

  useEffect(() => {
    fetchUserData(location);
  }, [location]);

  //* ---------> Check Geolocation Permission <--------- *//
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      setPermission(result.state);
      result.onchange = () => setPermission(result.state);
    });
  }, []);

  return (
    <div className="userLoc absolute p-2 sm:p-3 shadow-xl bg-white shadow-gray-500 z-[5] bottom-[2rem] min-[600px]:left-[3rem] lg:bottom-[-5rem] min-[300px]:left-5 rounded-lg md:h-[22rem] h-[17rem] w-[13rem] md:w-[17rem] sm:w-[20rem] backdrop-blur-md dark:bg-gray-700 dark:text-white">
      <div className="h-full text-black backdrop-filter backdrop-blur-md backdrop-opacity-60 p-1 sm:p-2 rounded-lg dark:text-white">
        {userLocationData ? (
          <>
            <h1 className="text-base sm:text-xl font-semibold">Welcome to, </h1>
            <h1 className="text-2xl sm:text-4xl font-bold text-purple-500 pb-1">
              {userLocationData.city}
            </h1>
            <h1 className="text-xs sm:text-sm font-semibold ml-1 text-gray-500 dark:text-gray-300">
              {" "}
              {userLocationData.state},{" "}
              <span className="font-bold">{userLocationData.country}</span>
            </h1>
            <h1 className="uppercase ml-1 font-bold text-base sm:text-lg">
              {userLocationData.country_code}
            </h1>
            <h2 className="font-semibold text-sm sm:text-base">Location Details:</h2>
            <div className="px-1 text-gray-500 text-xs sm:text-sm font-semibold space-y-1 dark:text-gray-200">
              <h2 className="text-xs sm:text-sm font-semibold">
                Current Location: {userLocationData.county}
              </h2>
              <h1 className="text-xs sm:text-sm">Complete Address: {userLocationData.formatted}</h1>
              <h3 className="text-xs sm:text-sm">Lon: {userLocationData.lon}</h3>
              <h3 className="text-xs sm:text-sm">Lat: {userLocationData.lat}</h3>
            </div>

            {permission === "denied" && (
              <p className="text-red-500 mt-3 text-center text-xs sm:text-sm">
                Location permission blocked. Please enable it manually in
                browser settings.
              </p>
            )}
          </>
        ) : (
          <div className="h-full flex flex-col gap-3 items-center justify-center">
            <span className="loader"></span>
            <p className="text-gray-500 font-semibold text-xs sm:text-sm">Loading Details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLocationDetails;
