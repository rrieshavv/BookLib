using System.Threading.Tasks;
using BookLib.Application;
using BookLib.Application.DTOs.Order;
using BookLib.Functions;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static System.Net.WebRequestMethods;

namespace BookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;
        private readonly IEmailService _emailService;
        public OrderController(IOrderService orderService, IEmailService emailService)
        {
            _emailService = emailService;   
            _orderService = orderService;
        }

        [HttpPost]
        [Route("place-order")]
        [Authorize(Roles = nameof(UserRole.customer))]
        public async Task<IActionResult> PlaceOrder(OrderDto orderDto)
        {
            try
            {
                var createOrder = await _orderService.CreateOrder(orderDto, ClaimsHelper.GetUserIdFromClaims(User));

                if(createOrder.Code == ResponseCode.Error)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, createOrder.Message);
                }

                


                return StatusCode(StatusCodes.Status201Created, createOrder.Data);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while placing the order." });
            }
        }
    }
}
