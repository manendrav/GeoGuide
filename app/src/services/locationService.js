import toast from "react-hot-toast";
import axios from "axios";
import {
  userlocation,
  serviceCategory,
  locationDetails,
} from "../utils/APIRoutes";

export const getUserLocationDetailes = async (payload) => {
  try {
    const response = await axios.post(userlocation, payload);
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};

export const getNearbyServices = async (service, payload) => {
  try {
    const response = await axios.post(serviceCategory(service), payload);
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};

export const getLocationDetails = async (locationId) => {
  try {
    const response = await axios.get(locationDetails(locationId));
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};
