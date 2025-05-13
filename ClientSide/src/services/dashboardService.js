import apiClient from "../utils/apiClient"

export const getAdminDashboard = async() =>{
  return (await apiClient.get(`/dashboard/admin`)).data
}

export const getStaffDashboard = async() =>{
  return (await apiClient.get(`/dashboard/staff`)).data
}