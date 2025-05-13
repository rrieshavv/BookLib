using BookLib.Application.DTOs.Dashboard;

namespace BookLib.Application.Interface
{
    public interface IDashboardService
    {
        Task<StaffDashboardDto> GetStaffDashboardData();
        Task<AdminDashboardDto> GetAdminDashboardData();

    }
}
