import toast from "react-hot-toast";
import axios from "axios";
import { userlocation, serviceRoute } from "../utils/APIRoutes";

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
    const response = await axios.post(serviceRoute(service), payload);
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};
