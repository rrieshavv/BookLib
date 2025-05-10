import { useNavigate } from "react-router-dom";

export const saveAuthData = (token, username) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("username", username);
};

export const getAuthData = () => {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");
  const role = getRole();
  return { token, username, role };
};

export const clearAuthData = () => {


  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");

  // sessionStorage.removeItem("role");
};

export const getRole = () => {
  try {
    const token = sessionStorage.getItem("token");
    const base64Payload = token.split(".")[1];
    const jsonPayload = atob(base64Payload);
    const payload = JSON.parse(jsonPayload);

    return payload[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
};
