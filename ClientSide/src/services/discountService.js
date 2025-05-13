import { data } from "react-router-dom";
import apiClient from "../utils/apiClient";


export const getCurrentDiscounts = async (bookId) => {
  try {
    const response = await apiClient.get('/Discount/book/getDiscounts', {
      params: {
        BookId: bookId,
        PageNumber: 1,
        PageSize: 100 
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching discount history:", error);
    throw error;
  }
};

export const createDiscount = async (discountData) => {
  try {
    const response = await apiClient.post('/Discount/book/addDiscount', discountData);
    return response.data;
  } catch (error) {
    console.error("Error creating discount:", error);
    throw error;
  }
};

export const updateDiscount = async (discountId, discountData) => {
  try {
    const response = await apiClient.put(`/Discount/book/editDiscount/${discountId}`, discountData);
    return response.data;
  } catch (error) {
    console.error("Error updating discount:", error);
    throw error;
  }
};


export const deleteDiscount = async (discountId) => {
  try {
    const response = await apiClient.delete(`/Discount/book/deleteDiscount/${discountId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting discount:", error);
    throw error;
  }
};



export const getDiscountById = async (id) => {
  try {
    const response = await apiClient.get(`/Discount/book/getDiscountById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching discount by ID:", error);
    throw error;
  }
};


export const getDiscountByDiscountId = async (id) => {
  try {
    const response = await apiClient.get(`/Discount/book/discount/getDiscountById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching discount by ID:", error);
    throw error;
  }
};


