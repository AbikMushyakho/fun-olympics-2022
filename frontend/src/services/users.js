import axios from "axios";

const baseUrl = "/api/users";
let token;

const getAll = async () => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};
const getOne = async (id) => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};
const update = async (id, newData) => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.patch(`${baseUrl}/${id}`, newData, config);
  return response.data;
};
const addToFav = async (videoId) => {
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  const user = JSON.parse(u);
  if (user) {
    token = `bearer ${user.token}`;
  }
  const config = {
    headers: { Authorization: token },
  };
  const Vid = { videoId: videoId };
  const response = await axios.patch(`${baseUrl}/fav/${user.id}`, Vid, config);
  return response.data;
};
export { getAll, getOne, update, addToFav };
