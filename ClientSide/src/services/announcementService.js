import apiClient from '../utils/apiClient';

const announcementService = {
  // Get all announcements
  getAllAnnouncements: async () => {
    try {
      const response = await apiClient.get('/announcements');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new announcement
  createAnnouncement: async (announcementData) => {
    try {
      const response = await apiClient.post('/announcements', announcementData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update an announcement
  updateAnnouncement: async (id, announcementData) => {
    try {
      const response = await apiClient.put(`/announcements/${id}`, announcementData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete an announcement
  deleteAnnouncement: async (id) => {
    try {
      const response = await apiClient.delete(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default announcementService; 