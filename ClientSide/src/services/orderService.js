import apiClient from "../utils/apiClient";

export const getAllOrders = async(status) =>{
  return (await apiClient.get(`/order/all-orders/${status}`)).data
}

export const cancelOrder = async ({ orderId, password }) => {
  try {
    const res = await apiClient.post(`/order/cancel-order`, {
      orderId,
      password,
    });
    return {
      success: true,
      message: "Successfully fetched.",
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response.data,
    };
  }
};

export const getCustomerOrderHistory = async () => {
  try {
    const res = await apiClient.get(`/order/customer-orders`);
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

export const getCustomerOrderDetails = async (id) =>{
   try {
    const res = await apiClient.get(
      `/order/customer-order-details/${id}`
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
}

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
      membershipCode: formdata.membershipId,
      remarks: formdata.remarks,
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

export const placeOrder = async (formData) => {
  try {
    // Get and validate cart items
    const cartQty = JSON.parse(localStorage.getItem("cartQty") || "[]");
    if (!Array.isArray(cartQty)) {
      throw new Error("Invalid cart data format");
    }

    // Prepare payload
    const payload = {
      ...formData,
      orderItems: cartQty.map((item) => ({
        bookId: item.id,
        quantity: item.quantity || 1,
      })),
      orderDate: new Date().toISOString(),
    };

    // Make API request
    const res = await apiClient.post("/order/place-order", payload);

    // Clear cart only after successful order
    localStorage.removeItem("cartQty");
    localStorage.removeItem("cart");

    return {
      success: true,
      message: "Order placed successfully",
      data: res.data,
      orderId: res.data.orderId, // Assuming API returns orderId
    };
  } catch (error) {
    // Enhanced error handling similar to reference
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Failed to place order",
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
        message: error.message || "Error preparing order request",
      };
    }
  }
};
