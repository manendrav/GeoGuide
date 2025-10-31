import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdLightMode } from "react-icons/md";

export const Dark = () => {
  const [themeMode, setThemeMode] = useState("light");

  const handleChange = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);

    // Update localStorage
    const existingUser = JSON.parse(localStorage.getItem("geo-user"));
    if (existingUser) {
      existingUser.themePreference = newTheme;
      localStorage.setItem("geo-user", JSON.stringify(existingUser));
    }

    // Apply theme immediately
    applyTheme(newTheme);
  };

  const applyTheme = (theme) => {
    // Update data-theme attribute for DaisyUI
    document.documentElement.setAttribute("data-theme", theme);

    // Update class for Tailwind dark mode
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme on component mount
  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("geo-user"));
    let initialTheme = "light";

    if (existingUser && existingUser.themePreference) {
      initialTheme = existingUser.themePreference;
    } else {
      // Check system preference
      initialTheme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    }

    setThemeMode(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Apply theme whenever themeMode changes
  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  return (
    <div>
      {themeMode === "dark" ? (
        <div
          onClick={() => handleChange()}
          className="cursor-pointer flex items-center gap-2 text-lg hover:bg-purple-500 hover:text-white rounded-md p-2"
        >
          <MdLightMode />
          <p>Light Mode</p>
        </div>
      ) : (
        <div
          onClick={() => handleChange()}
          className="cursor-pointer flex items-center gap-2 text-lg hover:bg-purple-500 hover:text-white rounded-md p-2"
        >
          <BsFillMoonStarsFill size={"0.9em"} />
          <p>Dark Mode</p>
        </div>
      )}
    </div>
  );
};
