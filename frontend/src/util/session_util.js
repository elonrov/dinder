import axios from "axios";

export const fetchSession = sessionId => {
  return axios.get(`/api/sessions/${sessionId}`);
};

export const createSession = sessionData => {
  return axios.post('/api/sessions/new', sessionData);
};