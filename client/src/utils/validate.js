export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateLogin = ({ email, password }) => {
  if (!email?.trim() || !password) {
    return "Email and password are required";
  }
  if (!validateEmail(email)) {
    return "Please enter a valid email address";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateRegister = ({ name, email, password }) => {
  if (!name?.trim() || !email?.trim() || !password) {
    return "All fields are required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  if (!validateEmail(email)) {
    return "Please enter a valid email address";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateProfile = ({ name }) => {
  if (!name?.trim()) {
    return "Name is required";
  }
  return null;
};
