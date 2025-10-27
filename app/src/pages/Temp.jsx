import React, { useEffect, useState } from "react";
import Button from "../components/layout/Button";
import { Link } from "react-router-dom";
import Map from "../components/Map";
import customQuery from "../components/customQuery";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
// icons start here
import {
  FaShoppingCart,
  FaTree,
  FaParking,
  FaToiletPaper,
  FaWheelchair,
  FaGasPump,
  FaPlane,
  FaBuilding,
  FaClinicMedical,
} from "react-icons/fa";
import { IoFastFoodSharp, IoLibrary, IoSchool } from "react-icons/io5";
import { MdLocalHotel, MdLocalAtm } from "react-icons/md";
import { FaHospitalUser, FaTrainSubway, FaMasksTheater } from "react-icons/fa6";
import { IoMdCafe } from "react-icons/io";
import { CgMenuLeft } from "react-icons/cg";
import { MdWifi, MdWifiOff } from "react-icons/md";
import { TbWheelchairOff } from "react-icons/tb";
import { BsFillBagCheckFill, BsBagXFill } from "react-icons/bs";
import { GiForkKnifeSpoon, GiCook } from "react-icons/gi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { RiHotelFill } from "react-icons/ri";
import SearchCategory from "../components/Search";

export default function Explore() {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState();

  const [search, setSearch] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [locationId, setLocationId] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState();
  const inputRef = React.createRef();
  const [
    userLocationData,
    nearbyLocationData,
    locationDetailes,
    routeData,
    error,
  ] = customQuery(location, search, locationId, routeCoordinates);

  //* ---------> Search Functionality <--------- *//
  const handleCategory = (category) => {
    setSearch([category]); // it is setting value
  };

  function handleSearch(category) {
    event.preventDefault();
    setSearch(category); // it is setting array
  }

  //* ---------> Get Location ID <--------- *//
  function handleLocationID(id) {
    setLocationId(id);
    setShowDetails(true);
  }

  function handleShowDetails() {
    setShowDetails(false);
  }

  //* ---------> Get Route Coordinate <--------- *//
  function handleRouteCoordinates() {
    const { lat, lon } = locationDetailes;
    if (lat && lon) {
      setRouteCoordinates({ lat, lon });
    } else {
      toast.error(
        "Error occurred while fetching data. Please try again later!!!"
      );
    }
  }

  //* ---------> Error Handling <--------- *//

  if (userLocationData === null || userLocationData === undefined) {
    setTimeout(() => {
      toast.error(
        "Error occurred while fetching data. Please try again later!!!"
      );
    }, 5000);
  }

  //* ---------> Set Category icon in Location detailes <--------- *//

  function setCategoryIcon(category) {
    switch (category) {
      case "commercial":
        return <FaShoppingCart size={"2.5em"} />;
      // catering / resturents
      case "catering":
        return <GiCook size={"2.5em"} />;
      case "catering.fast_food":
        return <IoFastFoodSharp size={"2.5em"} />;
      case "catering.restaurant":
        return <GiForkKnifeSpoon size={"2.5em"} />;
      case "catering.cafe":
        return <IoMdCafe size={"2.5em"} />;

      // hotels / accomodations
      case "accommodation":
        return <MdLocalHotel size={"2.5em"} />;
      case "building":
        return <HiBuildingOffice2 size={"2.5em"} />;
      case "accommodation.hotel":
        return <RiHotelFill size={"2.5em"} />;

      // helthcare
      case "healthcare":
        return <FaHospitalUser size={"2.5em"} />;
      case "healthcare.clinic_or_praxis":
        return <FaClinicMedical size={"2.5em"} />;

      // education
      case "education":
        return <IoSchool size={"2.5em"} />;
      case "education.library":
        return <IoLibrary size={"2.5em"} />;

      // Other
      case "public_transport":
        return <FaTrainSubway size={"2.5em"} />;
      case "entertainment":
        return <FaMasksTheater size={"2.5em"} />;
      case "service.financial":
        return <MdLocalAtm size={"2.5em"} />;
      case "natural.forest":
        return <FaTree size={"2.5em"} />;
      case "parking":
        return <FaParking size={"2.5em"} />;
      case "amenity.toilet":
        return <FaToiletPaper size={"2.5em"} />;
      case "fuel_options":
        return <FaGasPump size={"2.5em"} />;
      case "airport":
        return <FaPlane size={"2.5em"} />;

      default:
        return <FaBuilding size={"2em"} />;
    }
  }

  //* ---------> Get User Current Location <--------- *//
  useEffect(() => {
    if (navigator.geolocation) {
      // Ask for location permission
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  //* ---------> Local Storage <--------- *//
  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("geo-user"));

    if (existingUser) return;     // If user data already exists, do not overwrite

    const payload = {
      userId: uuidv4(),
      isVisited: true,
      userLocation:
        { lat: userLocation?.latitude, lon: userLocation?.longitude } || {}, // Fallback to empty object if location is not allowed by user
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

    if (existingUser) return;
    localStorage.setItem("geo-user", JSON.stringify(payload));
  }, []);

  return (
    <div className="mapview border-2 p-3">
      <div className="">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 flex flex-col min-h-[calc(100vh_-_theme(spacing.16))] mt-5">
            <div className="grid relative gap-4">
              <div className="absolute z-10 top-[10%] left-5">
                <div className="hidden rounded-lg bg-violet-500 text-white lg:block">
                  <div className="flex h-full max-h-screen flex-col">
                    <div className="flex-1 py-2">
                      <nav className="grid items-start space-y-2 px-2 text-sm font-medium">
                        <div
                          data-tip="Supermarkets"
                          onClick={() => handleCategory("commercial")}
                        >
                          <p>
                            <FaShoppingCart size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Restaurants"
                          onClick={() => handleCategory("catering")}
                        >
                          <p>
                            <IoFastFoodSharp size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Hotels"
                          onClick={() => handleCategory("accommodation")}
                        >
                          <p>
                            <MdLocalHotel size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Hospitals"
                          onClick={() => handleCategory("healthcare")}
                        >
                          <p>
                            <FaHospitalUser size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Library"
                          onClick={() => handleCategory("education.library")}
                        >
                          <p>
                            <IoLibrary size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Transportation"
                          onClick={() => handleCategory("public_transport")}
                        >
                          <p>
                            <FaTrainSubway size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Entertainment"
                          onClick={() => handleCategory("entertainment")}
                        >
                          <p>
                            <FaMasksTheater size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Banks or ATM"
                          onClick={() => handleCategory("service.financial")}
                        >
                          <p>
                            <MdLocalAtm size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Forest"
                          onClick={() => handleCategory("natural.forest")}
                        >
                          <p>
                            <FaTree size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Parking"
                          onClick={() => handleCategory("parking")}
                        >
                          <p>
                            <FaParking size={"1.5em"} />
                          </p>
                        </div>
                        <div
                          data-tip="Restrooms"
                          onClick={() => handleCategory("amenity.toilet")}
                        >
                          <p>
                            <FaToiletPaper size={"1.5em"} />
                          </p>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2 w-full">
                <div className="flex justify-center items-center rounded-xl z-[0] min-h-screen overflow-hidden border-2 w-full">
                  {loading ? (
                    <span className="loader"></span>
                  ) : (
                    <Map
                      nearbyLocationData={nearbyLocationData}
                      location={location}
                      routeData={routeData}
                      handleLocationID={handleLocationID}
                    />
                  )}
                </div>

                  {/* User Ki detailes */}
                <div className="userLoc absolute p-3 shadow-xl shadow-gray-500 z-[5] bottom-[2rem] min-[600px]:left-[7rem] min-[300px]:left-5 rounded-lg h-[25rem] w-[20rem] backdrop-blur-md">
                  <div className="h-full text-black backdrop-filter backdrop-blur-md backdrop-opacity-60 p-2 rounded-lg">
                    {Object.keys(userLocationData).length > 0 ? (
                      <div>
                        <h1 className="text-base font-semibold">
                          Welcome to,{" "}
                        </h1>
                        <h1 className="text-4xl font-bold text-purple-500 pb-1">
                          {userLocationData.name}
                        </h1>
                        <h1 className="text-sm font-semibold ml-1 text-gray-500">
                          {" "}
                          {userLocationData.state},{" "}
                          <span className="font-bold">
                            {userLocationData.country}
                          </span>
                        </h1>
                        <h1 className="uppercase ml-1 font-bold text-lg">
                          {userLocationData.country_code}
                        </h1>
                        <h2 className="font-semibold">Location Details:</h2>
                        <div className="px-1 text-gray-500 text-sm font-semibold space-y-1">
                          <h2 className="text-sm font-semibold">
                            Current Location: {userLocationData.county}
                          </h2>
                          <h1>
                            Complete Address: {userLocationData.formatted}
                          </h1>
                          <h3>Lon: {userLocationData.lon}</h3>
                          <h3>Lat: {userLocationData.lat}</h3>
                          {userLocationData.timezone ? (
                            <h3>
                              Time-Zone: {userLocationData.timezone.name},{" "}
                              {userLocationData.timezone.offset_DST}
                            </h3>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="loader"></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`absolute h-full w-[20rem] p-3 bg-gray-50 rounded-r-xl transition-transform duration-500 delay-500 ease-in-out ${
                  showDetails ? "right-0" : "right-[-20rem]"
                }`}
              >
                <div onClick={handleShowDetails}>
                  <RxCross2
                    size={"1.5em"}
                    className="ml-auto cursor-pointer hover:text-purple-500"
                  />
                </div>
                {Object.keys(locationDetailes).length > 0 ? (
                  <div className="p-3 space-y-1">
                    <h1 className="font-semibold text-lg">Welcome to,</h1>
                    <h1 className="text-2xl font-bold text-violet-500">
                      {locationDetailes.address_line1}
                    </h1>
                    <h3 className="italic text-sm text-gray-500">
                      {locationDetailes.address_line2}
                    </h3>
                    <h1 className="text-base font-semibold">
                      {locationDetailes.city}, {locationDetailes.state}
                    </h1>
                    <h1 className="text-base">
                      {" "}
                      {locationDetailes.county}, {locationDetailes.country},{" "}
                      <span className="uppercase">
                        {locationDetailes.country_code}
                      </span>
                    </h1>
                    <div className="flex space-x-2 px-2 items-center">
                      {locationDetailes.categories &&
                        locationDetailes.categories
                          .slice(0, 3)
                          .map((category, index) => {
                            return (
                              <p className="p-2" key={index}>
                                {setCategoryIcon(category)}
                              </p>
                            );
                          })}
                    </div>
                    <h1 className="font-semibold text-lg mt-1">Detailes: </h1>
                    <div className="px-2 space-y-1 ">
                      {locationDetailes.facilities && (
                        <div className="mb-3">
                          <h1 className="text-lg mt-1">Facilities:</h1>
                          <div className="flex py-2 space-x-5">
                            {locationDetailes.facilities.internet_access && (
                              <span className="ml-5">
                                {locationDetailes.facilities.internet_access ? (
                                  <MdWifi size="1.8em" />
                                ) : (
                                  <MdWifiOff size="1.8em" />
                                )}
                              </span>
                            )}
                            {locationDetailes.facilities.wheelchair && (
                              <span className="ml-5">
                                {locationDetailes.facilities.wheelchair ? (
                                  <FaWheelchair size="1.8em" />
                                ) : (
                                  <TbWheelchairOff size="1.8em" />
                                )}
                              </span>
                            )}
                            {locationDetailes.facilities.takeaway && (
                              <span className="ml-5">
                                {locationDetailes.facilities.takeaway ? (
                                  <BsFillBagCheckFill size="1.8em" />
                                ) : (
                                  <BsBagXFill size="1.8em" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {locationDetailes.contact && (
                        <h1>Contact No: {locationDetailes.contact.phone}</h1>
                      )}
                      {locationDetailes.opening_hours && (
                        <h1>Opening Hours: {locationDetailes.opening_hours}</h1>
                      )}
                      {locationDetailes.distance && (
                        <h1>Distance: {locationDetailes.distance} m</h1>
                      )}
                      <h1>Postcode: {locationDetailes.postcode}</h1>
                      <h1>lat: {locationDetailes.lat}</h1>
                      <h1>lon: {locationDetailes.lon}</h1>
                      {locationDetailes.timezone ? (
                        <h3>
                          Time-Zone: {locationDetailes.timezone.name},{" "}
                          {locationDetailes.timezone.offset_DST}
                        </h3>
                      ) : null}
                    </div>
                    <div>
                      {locationDetailes.website && (
                        <h1 className="font-semibold">
                          Website:
                          <span className="font-normal ml-3 text-blue-600 overflow-auto block">
                            <a
                              href={locationDetailes.website}
                              className="break-all"
                            >
                              {locationDetailes.website}
                            </a>
                          </span>
                        </h1>
                      )}
                    </div>
                    <div className="py-5">
                      <Button
                        onClick={handleRouteCoordinates}
                        className="w-full "
                      >
                        Route
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="loader"></span>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
