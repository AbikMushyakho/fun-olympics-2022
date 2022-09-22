import axios from "axios";
import { getToken, getUser } from "./token";

const baseUrl = "/api/users";
const token = getToken();
const config = {
  headers: { Authorization: token },
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
const addToFav = async (videoId) => {
  const Vid = { videoId: videoId };
  const user = getUser();
  const response = await axios.patch(`${baseUrl}/fav/${user.id}`, Vid, config);
  return response.data;
};
export { getAll, getOne, update, addToFav };
