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

    return { success: true, role };
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};
