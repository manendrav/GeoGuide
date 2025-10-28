import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import serviceMarker from "../../public/loc.svg";
import myMarker from "../../public/myLoc.png";
import routeMark from "../../public/routemark.png";
import toast from "react-hot-toast";
import ServiceDetailes from "./ServiceDetails";

const Map = ({ location, nearbyServices, setLocationData, toggleSidebar }) => {
  if (!location) {
    return null; // Render nothing if location is not available
  }

  const { latitude, longitude } = location || {};

  console.log("Map Component Location:", location);

  const serviceLoc = new Icon({
    iconUrl: serviceMarker,
    iconSize: [32, 42],
  });

  const myIcon = new Icon({
    iconUrl: myMarker,
    iconSize: [42, 42],
  });

  const routeIcon = new Icon({
    iconUrl: routeMark,
    iconSize: [42, 42],
  });

  const turnByTurnMarkerStyle = {
    radius: 8,
    fillColor: "white",
    color: "red",
    weight: 0,
    opacity: 1,
    fillOpacity: 1,
  };

  return (
    <MapContainer
      key={`${latitude}-${longitude}`} // Here why i use two time? -> MapContainer component doesn't automatically re-render when its center prop changes.
      center={[latitude, longitude]}
      zoom={16}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
      {nearbyServices
        ? Array.isArray(nearbyServices) &&
          nearbyServices.map((serviceInfo, index) => (
            <Marker
              key={index}
              position={[
                serviceInfo.geometry.coordinates[1],
                serviceInfo.geometry.coordinates[0],
              ]}
              icon={serviceLoc}
            >
              <Popup>
                <ServiceDetailes
                  serviceInfo={serviceInfo.properties}
                  setLocationData={setLocationData}
                  toggleSidebar={toggleSidebar}
                />
              </Popup>
            </Marker>
          ))
        : toast.error("No services found!!!")}

      <Marker position={[latitude, longitude]} icon={myIcon}></Marker>
    </MapContainer>
  );
};

export default Map;
