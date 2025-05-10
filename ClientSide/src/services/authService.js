import apiClient from "../utils/apiClient";
import { saveAuthData } from "../utils/authStorage";

export const loginUser = async (username, password) => {
  try {
    const response = (
      await apiClient.post("/auth/login", {
        username,
        password,
      })
    ).data;

    const { token, role } = response.data;

    // Save auth data to sessionStorage
    saveAuthData(token, username, role);

export const getUserInfo = async () => {
  try {
    const res = await apiClient.get("/auth/Get-User-Details");
    if (res.status == 200) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {
        success: false,
        data: res.data,
      };
    }
  } catch (err) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};
