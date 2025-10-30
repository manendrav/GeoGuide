import { useEffect, useState } from "react";
import { categories } from "../data/categories.jsx";
import { Category } from "./Category";
import { getNearbyServices } from "../services/locationService.js";

export const ServiceCategory = ({ setNearbyServices, location }) => {
  const [serviceCategory, setServiceCategory] = useState(null);

  const payload = {
    lat: location?.latitude,
    lon: location?.longitude,
  };

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

    try {
      const result = await getNearbyServices(serviceCategory, payload);
      console.log("Nearby Services:", result);
      
      if (result) setNearbyServices(result);
    } catch (error) {
      console.error("Error fetching nearby services:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchNearbyServices();
    }, 2000);
  }, [serviceCategory]);

  return (
    <nav className="flex justify-center px-2 text-sm font-medium">
      <div className="flex flex-wrap gap-3 justify-center py-2 rounded-md bg-violet-500 text-white w-[50%]">
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
