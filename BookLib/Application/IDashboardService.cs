using BookLib.Application.DTOs.Dashboard;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IDashboardService
    {
        Task<StaffDashboardDto> GetStaffDashboardData();
        Task<AdminDashboardDto> GetAdminDashboardData();

    }
}
