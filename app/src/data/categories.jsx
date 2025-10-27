import { FaHospitalUser, FaParking, FaShoppingCart, FaToiletPaper, FaTree } from "react-icons/fa";
import { FaMasksTheater, FaTrainSubway } from "react-icons/fa6";
import { IoFastFoodSharp, IoLibrary } from "react-icons/io5";
import { MdLocalAtm, MdLocalHotel } from "react-icons/md";

export const categories = [
  { tip: "Supermarkets", category: "commercial", icon: <FaShoppingCart size={"1.5em"} /> },
  { tip: "Restaurants", category: "catering", icon: <IoFastFoodSharp size={"1.5em"} /> },
  { tip: "Hotels", category: "accommodation", icon: <MdLocalHotel size={"1.5em"} /> },
  { tip: "Hospitals", category: "healthcare", icon: <FaHospitalUser size={"1.5em"} /> },
  { tip: "Library", category: "education.library", icon: <IoLibrary size={"1.5em"} /> },
  { tip: "Transportation", category: "public_transport", icon: <FaTrainSubway size={"1.5em"} /> },
  { tip: "Entertainment", category: "entertainment", icon: <FaMasksTheater size={"1.5em"} /> },
  { tip: "Banks or ATM", category: "service.financial", icon: <MdLocalAtm size={"1.5em"} /> },
  { tip: "Forest", category: "natural.forest", icon: <FaTree size={"1.5em"} /> },
  { tip: "Parking", category: "parking", icon: <FaParking size={"1.5em"} /> },
  { tip: "Restrooms", category: "amenity.toilet", icon: <FaToiletPaper size={"1.5em"} /> }
];
