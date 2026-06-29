export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1])).id;
  } catch {
    return null;
  }
};
