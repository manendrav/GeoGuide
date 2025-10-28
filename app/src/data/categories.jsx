import {
  FaBuilding,
  FaClinicMedical,
  FaGasPump,
  FaHospitalUser,
  FaParking,
  FaPlane,
  FaShoppingCart,
  FaToiletPaper,
  FaTree,
} from "react-icons/fa";
import { FaMasksTheater, FaTrainSubway } from "react-icons/fa6";
import { GiCook, GiForkKnifeSpoon } from "react-icons/gi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoMdCafe } from "react-icons/io";
import { IoFastFoodSharp, IoLibrary, IoSchool } from "react-icons/io5";
import { MdLocalAtm, MdLocalHotel } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";

export const categories = [
  {
    tip: "Supermarkets",
    category: "commercial",
    icon: <FaShoppingCart size={"1.5em"} />,
  },
  {
    tip: "Restaurants",
    category: "catering",
    icon: <IoFastFoodSharp size={"1.5em"} />,
  },
  {
    tip: "Hotels",
    category: "accommodation",
    icon: <MdLocalHotel size={"1.5em"} />,
  },
  {
    tip: "Hospitals",
    category: "healthcare",
    icon: <FaHospitalUser size={"1.5em"} />,
  },
  {
    tip: "Library",
    category: "education.library",
    icon: <IoLibrary size={"1.5em"} />,
  },
  {
    tip: "Transportation",
    category: "public_transport",
    icon: <FaTrainSubway size={"1.5em"} />,
  },
  {
    tip: "Entertainment",
    category: "entertainment",
    icon: <FaMasksTheater size={"1.5em"} />,
  },
  {
    tip: "Banks or ATM",
    category: "service.financial",
    icon: <MdLocalAtm size={"1.5em"} />,
  },
  {
    tip: "Forest",
    category: "natural.forest",
    icon: <FaTree size={"1.5em"} />,
  },
  { tip: "Parking", category: "parking", icon: <FaParking size={"1.5em"} /> },
  {
    tip: "Restrooms",
    category: "amenity.toilet",
    icon: <FaToiletPaper size={"1.5em"} />,
  },
];

export const facilities = [
  { case: "commercial", icon: <FaShoppingCart size={"2.5em"} /> },

  // catering / restaurants
  { case: "catering", icon: <GiCook size={"2.5em"} /> },
  { case: "catering.fast_food", icon: <IoFastFoodSharp size={"2.5em"} /> },
  { case: "catering.restaurant", icon: <GiForkKnifeSpoon size={"2.5em"} /> },
  { case: "catering.cafe", icon: <IoMdCafe size={"2.5em"} /> },

  // hotels / accommodations
  { case: "accommodation", icon: <MdLocalHotel size={"2.5em"} /> },
  { case: "accommodation.hotel", icon: <RiHotelFill size={"2.5em"} /> },
  { case: "building", icon: <HiBuildingOffice2 size={"2.5em"} /> },

  // healthcare
  { case: "healthcare", icon: <FaHospitalUser size={"2.5em"} /> },
  {
    case: "healthcare.clinic_or_praxis",
    icon: <FaClinicMedical size={"2.5em"} />,
  },

  // education
  { case: "education", icon: <IoSchool size={"2.5em"} /> },
  { case: "education.library", icon: <IoLibrary size={"2.5em"} /> },

  // other
  { case: "public_transport", icon: <FaTrainSubway size={"2.5em"} /> },
  { case: "entertainment", icon: <FaMasksTheater size={"2.5em"} /> },
  { case: "service.financial", icon: <MdLocalAtm size={"2.5em"} /> },
  { case: "natural.forest", icon: <FaTree size={"2.5em"} /> },
  { case: "parking", icon: <FaParking size={"2.5em"} /> },
  { case: "amenity.toilet", icon: <FaToiletPaper size={"2.5em"} /> },
  { case: "fuel_options", icon: <FaGasPump size={"2.5em"} /> },
  { case: "airport", icon: <FaPlane size={"2.5em"} /> },

  // default
  { case: "default", icon: <FaBuilding size={"2em"} /> },
];
