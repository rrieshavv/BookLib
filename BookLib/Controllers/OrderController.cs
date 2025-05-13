using BookLib.Application.DTOs.Order;
using BookLib.Application.Interface;
using BookLib.Functions;
using BookLib.Infrastructure.Common;
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

        [HttpPost("place-order")]
        [Authorize(Roles = nameof(UserRole.customer))]
        public async Task<IActionResult> PlaceOrder(OrderDto orderDto)
        {
            var createOrder = await _orderService.CreateOrder(orderDto, ClaimsHelper.GetUserIdFromClaims(User));

            if (createOrder.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, createOrder.Message);
            }

            return StatusCode(StatusCodes.Status201Created, createOrder.Data);
        }

        [HttpPost("cancel-order")]
        [Authorize(Roles = nameof(UserRole.customer))]
        public async Task<IActionResult> CancelOrder([FromBody] OrderCancelDto orderCancelDto)
        {
            var cancelOrder = await _orderService.CancelOrderByCustomer(orderCancelDto.OrderId, orderCancelDto.Password, ClaimsHelper.GetUsernameFromClaims(User));
            if (cancelOrder.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, cancelOrder.Message);
            }
            return StatusCode(StatusCodes.Status200OK, cancelOrder.Message);
        }


        [HttpGet("order-details/{membershipCode}/{claimCode}")]
        [Authorize(Roles = $"{nameof(UserRole.staff)},{nameof(UserRole.admin)}")]
        public async Task<IActionResult> GetOrderDetails(string claimCode, string membershipCode)
        {
            var orderDetails = await _orderService.GetOrderDetails(claimCode, membershipCode);
            if (orderDetails.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, orderDetails.Message);
            }
            return StatusCode(StatusCodes.Status200OK, orderDetails.Data);
        }

        [HttpPost("process-order")]
        [Authorize(Roles = $"{nameof(UserRole.staff)},{nameof(UserRole.admin)}")]
        public async Task<IActionResult> ProcessOrder([FromBody] OrderProcessDto orderProcessDto)
        {
            var processOrder = await _orderService.ProcessOrder(orderProcessDto.ClaimCode, orderProcessDto.MembershipCode, orderProcessDto.Remarks);
            if (processOrder.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, processOrder.Message);
            }
            return StatusCode(StatusCodes.Status200OK, processOrder.Message);
        }

        [HttpGet("customer-orders")]
        [Authorize(Roles = nameof(UserRole.customer))]
        public async Task<IActionResult> GetCustomerOrders()
        {
            var customerOrders = await _orderService.GetCustomerOrders(ClaimsHelper.GetUserIdFromClaims(User));
            if (customerOrders.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, customerOrders.Message);
            }
            return StatusCode(StatusCodes.Status200OK, customerOrders.Data);
        }

        [HttpGet("customer-order-details/{orderId}")]
        [Authorize(Roles = $"{nameof(UserRole.customer)},{nameof(UserRole.admin)}")]
        public async Task<IActionResult> GetCustomerOrderDetails(Guid orderId)
        {
            var orderDetails = new CommonResponse<OrderDetailsDto>();
            if (User.IsInRole(nameof(UserRole.admin)))
            {
                orderDetails = await _orderService.GetOrderDetailsByCustomer(ClaimsHelper.GetUserIdFromClaims(User), orderId, true);
            }
            else
            {
                orderDetails = await _orderService.GetOrderDetailsByCustomer(ClaimsHelper.GetUserIdFromClaims(User), orderId, false);
            }

            if (orderDetails.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, orderDetails.Message);
            }
            return StatusCode(StatusCodes.Status200OK, orderDetails.Data);
        }

        [HttpGet("all-orders/{status}")]
        [Authorize(Roles = $"{nameof(UserRole.admin)}")]
        public async Task<IActionResult> GetAllOrders(string status)
        {
            var allOrders = await _orderService.GetAllOrders(status);
            if (allOrders.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, allOrders.Message);
            }
            return StatusCode(StatusCodes.Status200OK, allOrders.Data);
        }
    }
}
