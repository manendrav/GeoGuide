import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import serviceMarker from "../../public/loc.svg";
import myMarker from "../../public/myLoc.png";
import routeMark from "../../public/routemark.png";
import ServiceDetailes from "./ServiceDetails";
import { useRef } from "react";

const Map = ({
  location,
  nearbyServices,
  setLocationData,
  toggleSidebar,
  fetchRouteDetails,
  routeData,
}) => {
  if (!location) {
    return null; // Render nothing if location is not available
  }

  const { latitude, longitude } = location || {};
    const popupRef = useRef(null); 

  // Render legs
  const renderLegs = () => {
    const features = [];

    // Safety check — ensure routeData has expected structure
    if (!routeData?.properties?.legs)
      return { type: "FeatureCollection", features };

    routeData.properties.legs.forEach((leg) => {
      leg.steps?.forEach((step) => {
        // Get coordinates from MultiLineString
        const coords = routeData.geometry?.coordinates?.[0]?.[step.from_index];

        if (!coords) return;

        const pointFeature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coords,
          },
          properties: {
            instruction: step.instruction?.text || "",
          },
        };

        features.push(pointFeature);
      });
    });

    return { type: "FeatureCollection", features };
  };

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

  const handleClosePopup = () => {
    const popup = popupRef.current;
    if (popup) {
      popup.close(); // 👈 closes the popup directly
    }
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
      {Array.isArray(nearbyServices) &&
        nearbyServices.map((serviceInfo, index) => (
          <Marker
            key={index}
            position={[
              serviceInfo.geometry.coordinates[1],
              serviceInfo.geometry.coordinates[0],
            ]}
            icon={serviceLoc}
          >
            <Popup ref={popupRef}>
              <ServiceDetailes
                serviceInfo={serviceInfo.properties}
                setLocationData={setLocationData}
                toggleSidebar={toggleSidebar}
                fetchRouteDetails={fetchRouteDetails}
                closePopup={handleClosePopup}
              />
            </Popup>
          </Marker>
        ))}

      <Marker position={[latitude, longitude]} icon={myIcon} />

      {routeData && Object.keys(routeData).length > 0 && (
        <GeoJSON
          key={JSON.stringify(routeData)}
          data={{
            type: "FeatureCollection",
            features: [
              routeData,
              ...renderLegs().features, // turn-by-turn points
            ],
          }}
          style={() => ({
            color: "#404be8",
            weight: 7,
          })}
          pointToLayer={(feature, latlng) =>
            L.circleMarker(latlng, turnByTurnMarkerStyle)
          }
          onEachFeature={(feature, layer) => {
            if (feature.properties?.instruction)
              layer.bindPopup(feature.properties.instruction);
          }}
        />
      )}

      {routeData?.properties?.waypoints?.map((waypoint, index) => (
        <Marker
          key={index}
          position={[waypoint.location[1], waypoint.location[0]]}
          icon={routeIcon}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
