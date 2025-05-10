import apiClient from "../utils/apiClient";

//Api for get all books
export const getAllBooks = async (page = 1, size = 10) => {
    try {
      const response = await apiClient.get(`/book/all`, {
        params: {
          PageNumber: page,
          PageSize: size,
        },
      });
  
      return response.data; 
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };




// Api for get book by Id
export const getBookById = async (id) => {
    try {
      const response = await apiClient.get(`/book/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      throw error;
    }
  };



// Api for filter books
export const getFilteredBooks = async (filters = {}) => {
  return await apiClient.get(`/book/search`, {
    params: {
      ...filters,
    },
  });
};



