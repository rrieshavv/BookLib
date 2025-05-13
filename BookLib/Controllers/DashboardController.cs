using BookLib.Application;
using BookLib.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DashboardController : Controller
    {

        private readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("admin")]
        [Authorize(Roles = nameof(UserRole.admin))]
        public async Task<IActionResult> Admin()
        {
            var data = await _dashboardService.GetAdminDashboardData();
            if (data == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "Error fetching data");
            }
            return StatusCode(StatusCodes.Status200OK, data);
        }

        [HttpGet("staff")]
        [Authorize(Roles = nameof(UserRole.staff))]
        public async Task <IActionResult> Staff()
        {
            var data = await _dashboardService.GetStaffDashboardData();
            if (data == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "Error fetching data");
            }
            return StatusCode(StatusCodes.Status200OK, data);
        }
    }
}
