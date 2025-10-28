import { BsBagXFill, BsFillBagCheckFill } from "react-icons/bs";
import { FaWheelchair } from "react-icons/fa";
import { MdWifi, MdWifiOff } from "react-icons/md";
import { TbWheelchairOff } from "react-icons/tb";
import Button from "./layout/Button";
import { facilities } from "../data/categories";

export const LocationDetails = ({ locationData, fetchRouteDetails }) => {
  const facilitiesData = facilities;

  return (
    <div className="p-3 space-y-1">
      <h1 className="font-semibold text-xl">Welcome to,</h1>
      <h1 className="text-2xl font-bold text-violet-500">
        {locationData?.address_line1}
      </h1>
      <h3 className="italic text-sm text-gray-500">
        {locationData?.address_line2}
      </h3>
      <h1 className="text-base font-semibold">
        {locationData?.city}, {locationData?.state}
      </h1>
      <h1 className="text-base">
        {" "}
        {locationData?.county}, {locationData?.country},{" "}
        <span className="uppercase">{locationData?.country_code}</span>
      </h1>
      <p className="font-semibold text-lg mt-1">Facilities:</p>
      <div className="flex space-x-2 px-2 items-center">
        {locationData.categories &&
          locationData.categories.slice(0, 3).map((category, index) => {
            return (
              <div
                title={category.split(".").pop()}
                className={`p-2 cursor-pointer`}
                key={index}
              >
                {
                  facilitiesData.find((facility) => facility.case === category)
                    ?.icon
                }
              </div>
            );
          })}
      </div>
      <h1 className="font-semibold text-lg mt-1">Detailes: </h1>
      <div className="px-2 space-y-1 ">
        {locationData?.facilities && (
          <div className="mb-3">
            <h1 className="text-lg mt-1">Facilities:</h1>
            <div className="flex py-2 space-x-5">
              {locationData?.facilities.internet_access && (
                <span className="ml-5">
                  {locationData?.facilities.internet_access ? (
                    <MdWifi size="1.8em" />
                  ) : (
                    <MdWifiOff size="1.8em" />
                  )}
                </span>
              )}
              {locationData?.facilities.wheelchair && (
                <span className="ml-5">
                  {locationData?.facilities.wheelchair ? (
                    <FaWheelchair size="1.8em" />
                  ) : (
                    <TbWheelchairOff size="1.8em" />
                  )}
                </span>
              )}
              {locationData?.facilities.takeaway && (
                <span className="ml-5">
                  {locationData?.facilities.takeaway ? (
                    <BsFillBagCheckFill size="1.8em" />
                  ) : (
                    <BsBagXFill size="1.8em" />
                  )}
                </span>
              )}
            </div>
          </div>
        )}
        {locationData?.contact && (
          <h1>Contact No: {locationData?.contact.phone}</h1>
        )}
        {locationData?.opening_hours && (
          <h1>Opening Hours: {locationData?.opening_hours}</h1>
        )}
        {locationData?.distance && (
          <h1>Distance: {locationData?.distance} m</h1>
        )}
        <h1>Postcode: {locationData?.postcode}</h1>
        <h1>lat: {locationData?.lat}</h1>
        <h1>lon: {locationData?.lon}</h1>
        {locationData?.timezone ? (
          <h3>
            Time-Zone: {locationData?.timezone.name},{" "}
            {locationData?.timezone.offset_DST}
          </h3>
        ) : null}
      </div>
      <div>
        {locationData?.website && (
          <h1 className="font-semibold">
            Website:
            <span className="font-normal ml-3 text-blue-600 overflow-auto block">
              <a href={locationData?.website} className="break-all">
                {locationData?.website}
              </a>
            </span>
          </h1>
        )}
      </div>
      <div className="py-5">
        <Button
          onClick={() => fetchRouteDetails({
            end_lat: locationData?.lat,
            end_lon: locationData?.lon,
          })}
          className="w-full "
        >
          Route
        </Button>
      </div>
    </div>
  );
};
