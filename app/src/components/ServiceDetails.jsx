import Button from "./layout/Button";
import { getLocationDetails } from "../services/locationService";

export default function ServiceDetailes({
  serviceInfo,
  setLocationData,
  toggleSidebar,
  fetchRouteDetails,
  closePopup,
}) {
  const fetchLocationData = async (id) => {
    if (!id) return;
    try {
      const data = await getLocationDetails(id);
      setLocationData(data);
      toggleSidebar();
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  return (
    <div className="p-1 sm:p-2">
      {/* Nearby Services Details tooltip */}
      <h1 className="text-lg sm:text-2xl py-1 font-semibold">
        {serviceInfo?.address_line1}
      </h1>
      <h3 className="italic text-xs sm:text-sm text-gray-500">{serviceInfo?.address_line2}</h3>
      <h1 className="text-sm sm:text-base py-1 font-semibold">
        {serviceInfo?.city}, {serviceInfo?.state}, {serviceInfo?.country}
      </h1>
      <h1 className="text-sm sm:text-base py-1 font-semibold">{serviceInfo?.county}</h1>
      <h4 className="font-semibold text-sm sm:text-base mt-1">Details:</h4>
      <div className="mx-2 sm:mx-5 my-2">
        <ul style={{ listStyleType: "disc", fontSize: '0.875rem' }}>
          {serviceInfo?.contact && (
            <li className="font-semibold text-xs sm:text-base mt-2">
              Contact No:{" "}
              <span className="font-medium">{serviceInfo.contact.phone}</span>
            </li>
          )}
          <li className="font-semibold text-xs sm:text-base">
            District:{" "}
            <span className="font-medium">{serviceInfo?.district}</span>
          </li>
          <li className="font-semibold text-xs sm:text-base">
            Distance:{" "}
            <span className="font-medium">{serviceInfo?.distance} m</span>
          </li>
          <li className="font-semibold text-xs sm:text-base">
            Postcode:{" "}
            <span className="font-medium">{serviceInfo?.postcode}</span>{" "}
          </li>
        </ul>
      </div>

      <div className="flex w-full gap-2 sm:gap-3 my-2 p-1 sm:p-2">
        <Button
          onClick={() => {
            fetchLocationData(serviceInfo?.place_id);
            closePopup();
          }}
          className="w-full text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2"
        >
          Know More
        </Button>

        <Button
          onClick={() => {
            fetchRouteDetails({
              end_lat: serviceInfo?.lat,
              end_lon: serviceInfo?.lon,
            });
            closePopup();
          }}
          className="w-full text-xs sm:text-base px-2 sm:px-4 py-1 sm:py-2"
        >
          Route
        </Button>
      </div>
    </div>
  );
}
