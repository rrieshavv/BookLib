export const getCurrentDiscounts = async (id) => {
    try {
      const response = await apiClient.get(`/Discount/book/getDiscounts`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      throw error;
    }
  };
