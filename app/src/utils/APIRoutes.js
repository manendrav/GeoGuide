import conf from "./conf";

export const host = conf.host;             
export const userlocation = `${host}/api/userlocation`;
export const serviceRoute = (service) => `${host}/api/services/${service}`;
