let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  window.localStorage.setItem("token", token);
};
const getToken = () => {
  const token = window.localStorage.getItem("token");
  return `${token}`;
};
const getUser = () => {
  let user;
  const u = window.localStorage.getItem("loggedInOlympicsUser");
  user = JSON.parse(u);
  return user;
};

const removeToken = () => {
  window.localStorage.removeItem("token");
};

export { setToken, getToken, removeToken, getUser };
