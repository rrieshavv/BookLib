using BookLib.Application.DTOs.Order;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IOrderService
    {
        Task<CommonResponse<OrderResponse>> CreateOrder (OrderDto orderDto, string userId);
        Task<CommonResponse> CancelOrderByCustomer(Guid order_id, string password, string userId);
    }
}
