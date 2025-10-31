import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SearchSuggestion } from "./SearchSuggestion";
import { RxCross2 } from "react-icons/rx";
import { getAddressSuggestions } from "../services/locationService";

const Search = () => {
  const [search, setSearch] = useState(null);
  const [searchedTerm, setSearchTerm] = useState(null);
  const [User, setUser] = useState(null);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const getUserFromLocalStorage = () => {
    const existingUser = JSON.parse(localStorage.getItem("geo-user"));
    return existingUser;
  };

  const handleSearch = (searchTerm) => {
    navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
    // store searched location in local storage
    const existingUser = getUserFromLocalStorage();
    if (existingUser) {
      const updatedSearchedLocations = existingUser.searchedLocations || [];
      if (searchTerm && !updatedSearchedLocations.includes(searchTerm)) {
        updatedSearchedLocations.push(searchTerm);
        existingUser.searchedLocations = updatedSearchedLocations;
        localStorage.setItem("geo-user", JSON.stringify(existingUser));
      }
    }
  };

  const handleOnfocus = () => {
    const existingUser = getUserFromLocalStorage();
    if (existingUser && existingUser.searchedLocations) {
      setUser(existingUser);
      setPreviousSearches(existingUser.searchedLocations);
      setShowHistory(true);
    }
  };

  // handle if click on the history item
  const handleHistoryItemClick = (location) => {
    setShowHistory(false);
    setShowSuggestions(false);
    handleSearch(location);
    setSearch("");
  };

  const handleDeleteSearch = (location) => {
    if (!User) return;
    const updatedLocations = User.searchedLocations.filter(
      (loc) => loc !== location
    );
    const updatedUser = { ...User, searchedLocations: updatedLocations };
    setUser(updatedUser);
    setPreviousSearches(updatedLocations);
    localStorage.setItem("geo-user", JSON.stringify(updatedUser));
    if (updatedLocations.length === 0) {
      setShowHistory(false);
    }
  };

  // handle suggestion
  const fetchSuggestions = async () => {
    if (!searchedTerm) return;
    const payload = { loc: searchedTerm };
    try {
      const suggestions = await getAddressSuggestions(payload);
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  useEffect(() => {
    // it is called every time when
    fetchSuggestions();
    setShowHistory(false);
  }, [searchedTerm]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchedTerm);
      // clear the search input after search
      setSearch("");
      setShowHistory(false);
    } else if (event.key === "Escape") {
      setShowHistory(false);
    }
  };

  useEffect(() => {
    // it called debouncing, means it will wait for 500ms after user stops typing
    const timer = setTimeout(() => {
      setSearchTerm(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="relative ">
      <div className="flex items-center rounded-md p-1 px-2 gap-3 w-[18vw] bg-white dark:bg-gray-700 dark:text-gray-200">
        <p>
          <FiSearch size="1.2em" />
        </p>
        <div className="flex gap-2 w-full ">
          <input
            type="search"
            value={search || ""}
            className="rounded-md outline-none w-full bg-transparent text-gray-500 dark:text-gray-200"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleOnfocus}
            onBlur={() => {
              // Close suggestions when input loses focus (with slight delay to allow clicks)
              setTimeout(() => {
                setShowHistory(false);
                setShowSuggestions(false);
              }, 100);
            }}
            placeholder="Type to search..."
          />
        </div>
      </div>

      {/* show previous searched locations */}
      <div>
        {showHistory && previousSearches.length > 0 && (
          <SearchSuggestion title={"History"}>
            {previousSearches
              .slice(-5)
              .reverse()
              .map((location, index) => (
                <div
                  key={index}
                  onMouseDown={() => handleHistoryItemClick(location)}
                  className="flex justify-between items-center z-0 cursor-pointer hover:text-purple-600 hover:bg-gray-100 px-2 rounded-md dark:hover:bg-gray-800 dark:text-white"
                >
                  <li className="py-0.5">{location}</li>
                  <p
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent click
                      handleDeleteSearch(location);
                    }}
                    className="p-0.5 hover:text-red-600 z-10"
                  >
                    <RxCross2 />
                  </p>
                </div>
              ))}
          </SearchSuggestion>
        )}
      </div>

      {/* show Location suggestions */}
      <div>
        {showSuggestions && suggestions?.length > 0 && (
          <SearchSuggestion title={"Suggestions"}>
            {suggestions?.map((suggestion, index) => (
              <div
                key={index}
                onMouseDown={() =>
                  handleHistoryItemClick(
                    suggestion?.address_line1 +
                      ", " +
                      (suggestion?.county ? suggestion?.county : "")
                  )
                }
                className="flex flex-col justify-between cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md dark:hover:bg-gray-800 dark:text-white"
              >
                <h1 className="font-semibold text-base text-black dark:text-white">
                  {suggestion?.address_line1},{" "}
                  {suggestion?.county ? suggestion?.county : ""}
                </h1>
                <h1 className="italic text-sm text-gray-500 dark:text-gray-300">
                  {suggestion?.address_line2}
                </h1>
              </div>
            ))}
          </SearchSuggestion>
        )}
      </div>
    </div>
  );
};

export default Search;
