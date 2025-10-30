import toast from "react-hot-toast";
import axios from "axios";
import {
  userlocation,
  serviceCategory,
  locationDetails,
  routeDetails,
  searchedLocationDetails,
  addressAutocomplete,
} from "../utils/APIRoutes";

export const getUserLocationDetailes = async (payload) => {
  try {
    const response = await axios.post(userlocation, payload);
    if(response?.data == null) {
      toast.error("No Services Found!!!");
    }
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};

export const getNearbyServices = async (service, payload) => {
  try {
    const response = await axios.post(serviceCategory(service), payload);
    if(response?.data == null) {
      toast.error("No Services Found!!!");
    }
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};

export const getLocationDetails = async (locationId) => {
  try {
    const response = await axios.get(locationDetails(locationId));
    if(response?.data == null) {
      toast.error("No Services Found!!!");
    }
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};

export const getRouteDetails = async (payload) => {
  try {
    const response = await axios.post(routeDetails, payload);
    if(response?.data == null) {
      toast.error("No Services Found!!!");
    }
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};

export const getSearchedLocationDetails = async (payload) => {
  try {
    const response = await axios.post(searchedLocationDetails, payload);
    if(response?.data == null) {
      toast.error("No Services Found!!!");
    }
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};

export const getAddressSuggestions = async (payload) => {
  try {
    const response = await axios.post(addressAutocomplete, payload);
    if(response?.data == null) {
      toast.error("No Services Found!!!");
    }
    return response?.data;
  } catch (error) {
    console.error("Error occurred:", error);
    toast.error(error.message);
  }
};
