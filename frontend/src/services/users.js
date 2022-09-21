import axios from "axios";
import { getToken } from "./token";

const token = getToken();
const baseUrl = "/api/users";
const config = {
  headers: { Authorization: `${token}` },
};
const getAll = async () => {
  const response = await axios.get(baseUrl, config);
  return response.data;
};
const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};
const update = async (id, newData) => {
  const response = await axios.patch(`${baseUrl}/${id}`, newData, config);
  return response.data;
};

export { getAll, getOne, update };
