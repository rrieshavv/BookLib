using BookLib.Application.DTOs.Order;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IOrderService
    {
        Task<CommonResponse<OrderResponse>> CreateOrder (OrderDto orderDto, string userId);
        Task<CommonResponse> CancelOrderByCustomer(Guid order_id, string password, string userId);
        Task<CommonResponse<OrderDetailsDto>> GetOrderDetails(string claim_code, string membershipCode);
        Task<CommonResponse> ProcessOrder(string claimCode, string membershipCode, string remarks);
    }
}
