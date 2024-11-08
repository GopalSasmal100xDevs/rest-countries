import { get } from "../api";

export const getCountries = () => get("/all");
export const getCountryDetails = (id) => get(`/alpha/${id}`);
