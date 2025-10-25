import { Link } from "react-router-dom";

import Search from "../Search";
import { MdOutlineTravelExplore } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";

const navLinks = [
  { id: 1, name: "Home", path: "/", icons: <AiFillHome /> },
  {
    id: 2,
    name: "Explore",
    path: "/explore",
    icons: <MdOutlineTravelExplore />,
  },
  { id: 3, name: "Contact Us", path: "/contact", icons: <FaPhoneAlt /> },
  { id: 4, name: "Register", path: "/signup", icons: <FaUserPlus /> },
  { id: 5, name: "Dark Mode", path: "", icons: <CiLight /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar max-w-6xl mx-auto">
      {/* Left part of navbar */}
      <div className="flex-1">
        <Link to={"/"}>
          <img
            src="../geologo.png"
            width={120}
            className="text-xl font-semibold cursor-pointer"
          />
        </Link>
      </div>

      {/* Right part of navbar */}
      <div className="flex gap-3">
        <form>
          <Search />
        </form>

        {/* Hamburger menu */}
        <div className="block">
          <button onClick={toggleSidebar}>
            <CgMenuRight size="1.5em" />
          </button>
        </div>

        {/* Sidebar coming from the right */}
        <aside
          className={`fixed top-0 right-0 w-[18vw] h-full z-10 bg-gray-50 text-black  transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="p-4 flex justify-between text-2xl items-center cursor-pointer">
            <div>
              <h3 className="font-semibold">Menu</h3>
            </div>
            <div className="px-4 flex justify-end  cursor-pointer">
              <button
                className="hover:bg-gray-200 text-2xl rounded-full p-2"
                onClick={toggleSidebar}
              >
                <RxCross2 />
              </button>
            </div>
          </div>

          {/* Sidebar content */}
          <nav className="flex flex-col px-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                to={link.path}
                key={link.id}
                className="cursor-pointer text-lg hover:bg-purple-500 hover:text-white rounded-md p-2"
                onClick={toggleSidebar}
              >
                <p className="flex items-center gap-2">
                  {link.icons} {link.name}
                </p>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay for closing sidebar */}
        {isOpen && <div className="fixed" onClick={toggleSidebar}></div>}
      </div>
    </div>
  );
}
