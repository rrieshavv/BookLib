import { data } from "react-router-dom";
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


// Api for update book
export const updateBook = async (id, bookData) => {
  try {
    const response = await apiClient.put(`/book/${id}`, bookData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 60000,
      httpVersion: 'HTTP/1.1',
      transformRequest: [function (data) {
        return data; 
      }],
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
    
    return response.data;
  } 
  catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network error:", error.request);
          if (error.message === 'Network Error' && error.code === 'ERR_NETWORK') {
            console.log("HTTP/2 protocol error detected. The request was likely successful but the connection was terminated before completion.");
            return { 
              code: 0, 
              message: "Update likely successful but connection terminated early" 
            };
          }
    } else {
      console.error("Request setup error:", error.message);
    }
  }
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


export const addBook = async (bookData) => {
  try {
    const response = await apiClient.post('/book/add', bookData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 60000,
      httpVersion: 'HTTP/1.1',
      transformRequest: [function (data) {
        return data;
      }],
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    return response.data;
  } 
  catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.status, error.response.data);
      return {
        code: -1,
        message: error.response.data.message || "Server error"
      };
    } else if (error.request) {
      console.error("Network error:", error.request);
      if (error.message === 'Network Error' && error.code === 'ERR_NETWORK') {
        console.log("HTTP/2 protocol error detected. The request was likely successful but the connection was terminated before completion.");
        return {
          code: 0,
          message: "Add likely successful but connection terminated early"
        };
      }
      return {
        code: -1,
        message: "Network error"
      };
    } else {
      console.error("Request setup error:", error.message);
      return {
        code: -1,
        message: error.message || "Request setup error"
      };
    }
  }
};