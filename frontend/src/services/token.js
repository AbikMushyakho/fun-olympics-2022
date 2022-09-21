let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  window.localStorage.setItem("token", token);
};
const getToken = () => {
  const token = window.localStorage.getItem("token");
  return `${token}`;
};
const removeToken = () => {
  window.localStorage.removeItem("token");
};

export { setToken, getToken, removeToken };
