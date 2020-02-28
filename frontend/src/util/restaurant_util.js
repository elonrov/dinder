import axios from "axios";

export const fetchRestarants = (apiData) => (
  axios.get("/api/session/restaurants", apiData)
);