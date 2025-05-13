import { data } from "react-router-dom";
import apiClient from "../utils/apiClient";


export const getInventories = async () => {
  try {
    const response = await apiClient.get(`/Inventory/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventories:', error);
    throw error;
  }
};

export const getInventoryByBookId = async (bookId) => {
  try {
    const response = await apiClient.get(`/Inventory/book/${bookId}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching inventory for bookId ${bookId}:`, error);
    throw error;
  }
};

export const addInventory = async (inventoryData) => {
  try {
    const response = await apiClient.post("/Inventory/add", inventoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding inventory:", error);
    throw error;
  }
};

export const updateInventory = async (id, inventoryData) => {
  try {
    const response = await apiClient.put(`/Inventory/${id}`, inventoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating inventory with id ${id}:`, error);
    throw error;
  }
};

export const deleteInventory = async (id) => {
  try {
    const response = await apiClient.delete(`/Inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting inventory with id ${id}:`, error);
    throw error;
  }
};
