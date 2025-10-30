import conf from "./conf";

export const host = conf.host;
export const userlocation = `${host}/api/userlocation`;
export const serviceCategory = (service) => `${host}/api/services/${service}`;
export const locationDetails = (locationId) =>
  `${host}/api/service/details/${locationId}`;
export const routeDetails = `${host}/api/service/route`;
export const searchedLocationDetails = `${host}/api/search/location`;
export const addressAutocomplete = `${host}/api/search/addressautocomplete`;
