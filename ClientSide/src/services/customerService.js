import apiClient from "../utils/apiClient";

export const customerService = {
    getAllCustomers: async () => {
        try {
            const response = await apiClient.get("/Auth/Get-all-customers");
            console.log("API Response:", response.data); // Debug log
            
            // Check if response.data exists and has the expected structure
            if (!response.data) {
                throw new Error("No data received from the server");
            }

            // If the response is an array, return it directly
            if (Array.isArray(response.data)) {
                return response.data;
            }

            // If the response has a code and data structure
            if (response.data.code === "Success" && response.data.data) {
                return response.data.data;
            }

            // If we have a message but no data, throw with the message
            if (response.data.message) {
                throw new Error(response.data.message);
            }

            // If we have data but no specific structure, return it
            return response.data;
        } catch (error) {
            console.error("Service Error:", error);
            // If it's an axios error, try to get the error message from the response
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            // If it's our own error, pass it through
            if (error.message) {
                throw error;
            }
            // Default error
            throw new Error("Failed to fetch customers");
        }
    }
};