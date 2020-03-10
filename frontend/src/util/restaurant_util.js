import axios from "axios";

export const fetchRestaurants = (apiData) => {

  return axios.post("/api/session/restaurants", apiData)
};