using BookLib.Application.DTOs.Order;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IOrderService
    {
        Task<CommonResponse<OrderResponse>> CreateOrder(OrderDto orderDto, string userId);
    }
}
