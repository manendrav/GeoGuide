import { useEffect, useState } from "react";
import { categories } from "../data/categories.jsx";
import { Category } from "./Category";
import { getNearbyServices } from "../services/locationService.js";

export const ServiceCategory = ({ setNearbyServices, location, searchedLocation }) => {
  const [serviceCategory, setServiceCategory] = useState(null);

  if (!categories || categories.length === 0) {
    return null; // or some fallback UI
  }

  //* ---------> Handle Category Selection <--------- *//
  const handleCategory = (category) => {
    setServiceCategory(category);
  };

  //* ---------> Fetch Nearby Services <--------- *//
  const fetchNearbyServices = async () => {
    if (!serviceCategory) return;

    // Create payload with current location data - prioritize searched location
    const payload = {
      lat: searchedLocation?.latitude || location?.latitude,
      lon: searchedLocation?.longitude || location?.longitude,
    };

    // Don't fetch if we don't have coordinates
    if (!payload.lat || !payload.lon) return;

    try {
      const result = await getNearbyServices(serviceCategory, payload);
      if (result) setNearbyServices(result);
    } catch (error) {
      console.error("Error fetching nearby services:", error);
    }
  };

  // Clear services and reset category when location changes
  useEffect(() => {
    if (location || searchedLocation) {
      setNearbyServices([]); // Clear existing services
      setServiceCategory(null); // Reset selected category
    }
  }, [location?.latitude, location?.longitude, searchedLocation?.latitude, searchedLocation?.longitude]);

  // Only fetch services when user explicitly selects a category
  useEffect(() => {
    if (serviceCategory) {
      setTimeout(() => {
        fetchNearbyServices();
      }, 2000);
    }
  }, [serviceCategory]);

  return (
    <nav className="flex justify-center px-2 text-sm font-medium">
      <div className="flex flex-nowrap gap-3 justify-start md:justify-center py-2 rounded-md bg-violet-500 text-white min-w-full lg:min-w-[50%] overflow-x-auto md:overflow-visible md:flex-wrap" style={{ overflowY: 'visible', WebkitOverflowScrolling: 'touch' }}>
        {categories.map(({ tip, category, icon }, index) => (
          <Category
            key={index}
            tip={tip}
            category={category}
            icon={icon}
            handleCategory={handleCategory}
          />
        ))}
      </div>
    </nav>
  );
};
