import axios from "axios";

const baseUrl = "/api/users";
const loginUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};
const signup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const verify = async ({ email, code }) => {
  const response = await axios.post(`${baseUrl}/verify`, { email, code });
  return response.data;
};
export { login, signup, verify };
