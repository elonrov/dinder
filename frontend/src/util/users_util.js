import axios from "axios";

// export const fetchUser = userId => {
//   return axios.get(`/api/users/${userId}`);
// };

// may add later if fetch required

export const createUser = userData => {
  return axios.post('/api/users/create', userData);
}; 
// requests