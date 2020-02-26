import axios from "axios";

export const fetchSession = sessionId => {
  return axios.get(`/api/session/${sessionId}`);
};

export const createSession = sessionData => {
  return axios.post('/api/session/new', sessionData);
};