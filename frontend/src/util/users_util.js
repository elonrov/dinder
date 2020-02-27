import axios from "axios";

export const fetchUser = (userData) => { // WORKED IN POSTMAN BUT NOT IN CONSOLE
  return axios.get('/api/users/show', userData);
}; // gets user based on given session and their special sessionCode

export const createUser = userData => {
  return axios.post('/api/users/create', userData);
}; // makes new user passing in email and sessionId of which they belong

export const updateUser = userData => {
  return axios.patch(`/api/users/${userData.userId}`, userData);
};  // will send updates to user when finished selecting to update rejections arr