import apiClient from "../utils/apiClient";

export const getOrderDetails = async (membershipId, claimCode) => {
  try {
    const res = await apiClient.get(
      `/order/order-details/${membershipId}/${claimCode}`
    );
    return {
      success: true,
      message: "Successfully fetched.",
      data: res.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data || "Failed to fetch order details",
        error: error.response.data,
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response received from server",
      };
    } else {
      return {
        success: false,
        message: error.message || "Error setting up request",
      };
    }
  }
};

export const processOrderConfirm = async (formdata) => {
  try {
    const payload = {
      claimCode: formdata.claimCode,
      membershipCode:  formdata.membershipId,
      remarks:  formdata.remarks,
    };

    const res = await apiClient.post(`/order/process-order`, payload);
    return {
      success: true,
      message: "Order processed successfully",
      data: res.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Failed to process order",
        error: error.response.data,
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response received from server",
      };
    } else {
      return {
        success: false,
        message: error.message || "Error setting up request",
      };
    }
  }
};