import axios from "axios";

export const verifyUser = (userData) => {   // changed to post request in order to send data
  return axios.post('/api/users/show', userData);
}; // acts as a GET to get user based on given session and their special sessionCode

export const createUser = userData => {
  return axios.post('/api/users/create', userData);
}; // makes new user passing in email and sessionId of which they belong

export const updateUser = userData => {
  return axios.patch(`/api/users/${userData.userId}`, userData);
};  // will send updates to user when finished selecting to update rejections arr