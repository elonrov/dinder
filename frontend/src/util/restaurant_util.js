import axios from "axios";

export const fetchRestarants = (cuisine) => (
  axios.get("/api/session/restaurants", cuisine)
);