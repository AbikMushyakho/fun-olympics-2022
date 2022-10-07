import axios from "axios";

const baseUrl = "/api/change";

const send_mail = async (credentials) => {
  const response = await axios.post(`${baseUrl}/send_mail`, credentials);
  return response.data;
};
const verify_otp = async (credentials) => {
  const response = await axios.post(`${baseUrl}/verify_otp`, credentials);
  return response.data;
};
const new_password = async (credentials) => {
  const response = await axios.post(`${baseUrl}/new_password`, credentials);
  return response.data;
};
export { send_mail, verify_otp, new_password };
