using System.Threading.Tasks;
using BookLib.Application;
using BookLib.Application.DTOs.Order;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Route("place-order")]
        [Authorize(Roles = nameof(UserRole.customer))]
        public async Task<IActionResult> PlaceOrder(OrderDto orderDto)
        {
            try
            {
                var createOrder = await _orderService.CreateOrder(orderDto);
                return StatusCode(StatusCodes.Status201Created, orderDto);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while placing the order." });
            }
        }
    }
}
