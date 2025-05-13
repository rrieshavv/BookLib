using BookLib.Application.Data;
using BookLib.Application.DTOs.Dashboard;
using BookLib.Application.Interface;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ApplicationDbContext _context;
        public DashboardService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<StaffDashboardDto> GetStaffDashboardData()
        {
            var totalPending = await _context.Orders.Where(x => x.status.ToLower() == "pending").CountAsync();
            var completedToday = await _context.Orders.Where(x => x.status.ToLower() == "completed" && x.created_ts.Date == DateTime.UtcNow.Date).CountAsync();

            return new StaffDashboardDto
            {
                CompletedToday = completedToday,
                PendingOrders = totalPending
            };
        }

        public async Task<AdminDashboardDto> GetAdminDashboardData()
        {
            var totalOrders = await _context.Orders.CountAsync();
            var totalBooks = await _context.Books.CountAsync();
            var totalPending = await _context.Orders.Where(x => x.status.ToLower() == "pending").CountAsync();
            var totalCompletedOrders = await _context.Orders.Where(x => x.status.ToLower() == "completed").CountAsync();
            var totalcancelledOrders = await _context.Orders.Where(x => x.status.ToLower() == "cancelled").CountAsync();
            var totalStaff = await _context.Roles
                .Where(x => x.Name.ToLower() == "staff")
                .Join(_context.UserRoles, r => r.Id, ur => ur.RoleId, (r, ur) => ur)
                .Join(_context.Users, ur => ur.UserId, u => u.Id, (ur, u) => u)
                .CountAsync();
            var totalCustomers = await _context.Roles.Where(x => x.Name.ToLower() == "customer")
                .Join(_context.UserRoles, r => r.Id, ur => ur.RoleId, (r, ur) => ur)
                .Join(_context.Users, ur => ur.UserId, u => u.Id, (ur, u) => u)
                .CountAsync();

            return new AdminDashboardDto
            {
                TotalOrders = totalOrders,
                TotalCustomers = totalCustomers,
                TotalBooks = totalBooks,
                TotalPendingOrders = totalPending,
                TotalCompletedOrders = totalCompletedOrders,
                TotalStaffs = totalStaff,
                TotalCancelledOrders = totalcancelledOrders
            };
        }
    }
}
