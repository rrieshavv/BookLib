import apiClient from '../utils/apiClient';

const bookMetaDataService = {
  // Author operations
  getAllAuthors: async () => {
    try {
      const response = await apiClient.get('/author');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createAuthor: async (name) => {
    try {
      const response = await apiClient.post('/author', name);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateAuthor: async (id, name) => {
    try {
      const response = await apiClient.put(`/author/${id}`, name);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteAuthor: async (id) => {
    try {
      const response = await apiClient.delete(`/author/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAuthorById: async (id) => {
    try {
      const response = await apiClient.get(`/author/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Publisher operations
  getAllPublishers: async () => {
    try {
      const response = await apiClient.get('/publisher');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createPublisher: async (name) => {
    try {
      const response = await apiClient.post('/publisher', name);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updatePublisher: async (id, name) => {
    try {
      const response = await apiClient.put(`/publisher/${id}`, name);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deletePublisher: async (id) => {
    try {
      const response = await apiClient.delete(`/publisher/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPublisherById: async (id) => {
    try {
      const response = await apiClient.get(`/publisher/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Genre operations
  getAllGenres: async () => {
    try {
      const response = await apiClient.get('/genre');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createGenre: async (name) => {
    try {
      const response = await apiClient.post('/genre', name);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateGenre: async (id, name) => {
    try {
      const response = await apiClient.put(`/genre/${id}`, name);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteGenre: async (id) => {
    try {
      const response = await apiClient.delete(`/genre/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getGenreById: async (id) => {
    try {
      const response = await apiClient.get(`/genre/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default bookMetaDataService;