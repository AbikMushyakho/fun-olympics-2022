import axios from "axios";
import { getToken } from "./token";

const baseUrl = "/api/video";

const token = getToken();
const config = {
  headers: { Authorization: token },
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`,config);
  return response.data;
};
const create = async (newObject) => {
  const configs = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  };
  const response = await axios.post(baseUrl, newObject, configs);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.patch(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};



export { create, getAll, getOne, update};
