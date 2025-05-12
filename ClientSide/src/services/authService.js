import apiClient from "../utils/apiClient";
import { saveAuthData } from "../utils/authStorage";

export const loginUser = async (username, password) => {
  try {
    const res = await apiClient.post("/auth/login", { username, password });

    if (res.status === 200) {
      const { token, user } = res.data.data;
      saveAuthData(token, user);
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: res.data?.message || "Login failed" };
    }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data || "Login failed",
    };
  }
};

export const registerUser = async (formdata) => {
  try {
    const res = await apiClient.post("/auth/register-customer", {
      username: formdata.username,
      firstname: formdata.firstname,
      lastname: formdata.lastname,
      email: formdata.email,
      mobile: formdata.mobile,
      password: formdata.password,
      confirmPassword: formdata.confirmPassword,
    });
    console.log(res);
    if (res.status === 201) {
      return { success: true, message: res.data };
    } else {
      return { success: false, message: res.data || "Registrationd failed" };
    }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data || "Registrationsdf failed",
    };
  }
};

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
      message: err.response?.data || "Internal error",
    };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const res = await apiClient.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    if (res.status === 200) {
      return {
        success: true,
        message: res.data,
      };
    } else {
      return {
        success: false,
        message: res.data,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.response?.data || "Internal error",
    };
  }
};