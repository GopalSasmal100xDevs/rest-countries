import config from "../config";

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${config.apiBaseUrl}${endpoint}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const get = (endpoint) => fetchAPI(endpoint, { method: "GET" });
