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


// Api to get all authors
export const getAllAuthors = async () => {
  try {
    const response = await apiClient.get("/book/authors");
    return response.data;
  } catch (error) {
    console.error("Error fetching authors", error);
    throw error;
  }
};


//Api to get all genres
export const getAllGenres = async () => {
  try {
    const response = await apiClient.get("/book/genres");
    return response.data;
  } catch (error) {
    console.error("Error fetching genres", error);
    throw error;
  }
};

//Api to get all publishers
export const getAllPublishers = async () => {
  try {
    const response = await apiClient.get("/book/publishers");
    return response.data;
  } catch (error) {
    console.error("Error fetching publishers", error);
    throw error;
  }
};

//Api to get all distinct languages from books
export const getAllLanguages = async () => {
  try {
    const response = await apiClient.get("/book/languages");
    return response.data;
  } catch (error) {
    console.error("Error fetching languages", error);
    throw error;
  }
};

//Api to get all distinct formats from books
export const getAllFormats = async () => {
  try {
    const response = await apiClient.get("/book/formats");
    return response.data; 
  } catch (error) {
    console.error("Error fetching formats", error);
    throw error;
  }
};





