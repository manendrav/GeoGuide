import React, { useState } from "react";
import Button from "./layout/Button";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

const Search = ({ handleSearch }) => {
  const categories = [
    "accommodation.hotel",
    "accommodation.apartment",
    "accommodation.chalet",
    "accommodation.motel",
    "airport",
    "commercial.elektronics",
    "commercial.vehicle",
    "commercial.hobby",
    "commercial.clothing",
    "commercial.houseware_and_hardware",
    "commercial.gas",
    "commercial.weapons",
    "catering.restaurant",
    "catering.restaurant.indian",
    "catering.restaurant.italian",
    "catering.restaurant.mexican",
    "catering.restaurant.japanese",
    "catering.cafe",
    "catering.cafe.coffee",
    "religion",
    "religion.place_of_worship",
    "education",
    "education.school",
    "education.library",
    "education.college",
    "education.university",
    "entertainment",
    "entertainment.zoo",
    "entertainment.aquarium	",
    "entertainment.planetarium	",
    "entertainment.museum	",
    "entertainment.cinema",
    "healthcare",
    "healthcare.dentist	",
    "healthcare.dentist.orthodontics",
    "healthcare.hospital",
    "healthcare.pharmacy",
    "service",
    "service.cleaning",
    "service.cleaning.lavoir",
    "service.cleaning.laundry",
    "service.cleaning.dry_cleaning",
    "tourism",
    "tourism.information",
    "tourism.sights",
    "tourism.attraction",
    "natural.water.sea",
    "natural.mountain",
    "natural.mountain.peak",
    "office.government.ministry",
    "office.government.healthcare",
    "office.government.prosecutor",
    "office.government.transportation",
    "office.government.social_services",
    "office.government.legislative",
    "office.government.education",
    // Add more categories as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (category) => {
    if (selectedCategories.length < 5) {
      setSelectedCategories([...selectedCategories, category]);
      setSearchTerm("");
    } else {
      toast("You can not add more categories   ", {
        icon: "⚠️",
      });
    }
  };

  const handleRemove = (category) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  return (
      <div className="relative flex items-center rounded-md p-1 px-2 gap-3 w-[18vw] bg-white">
        <p>
          <FiSearch size="1.2em" />
        </p>
        <div className="flex gap-2 w-full">
          {selectedCategories.map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-purple-500 text-white rounded-md"
            >
              {category}
              <button
                className="ml-2 text-lg"
                onClick={() => handleRemove(category)}
              >
                ×
              </button>
            </span>
          ))}
          
            <input
              type="search"
              value={searchTerm}
              className="rounded-md outline-none w-full bg-transparent text-gray-500"
              onChange={handleChange}
              placeholder="Type to search..."
            />
          
        </div>

        {searchTerm && (
          <div className="absolute bg-slate-50 z-[20] top-full left-0 w-full max-h-[20rem] overflow-y-auto shadow-md">
            <div className="p-5">
              <h1 className="font-semibold text-lg">Select Categories:</h1>
              <ul className="px-3">
                {categories
                  .filter((category) =>
                    category.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((result, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(result)}
                      className="cursor-pointer text-base hover:text-purple-600"
                    >
                      {result}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
  );
};

export default Search;
