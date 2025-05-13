using BookLib.Application.DTOs.Order;
using BookLib.Infrastructure.Common;

namespace BookLib.Application.Interface
{
    public interface IOrderService
    {
        Task<CommonResponse<OrderResponse>> CreateOrder (OrderDto orderDto, string userId);
        Task<CommonResponse> CancelOrderByCustomer(Guid order_id, string password, string userId);
        Task<CommonResponse<OrderDetailsDto>> GetOrderDetails(string claim_code, string membershipCode);
        Task<CommonResponse<OrderDetailsDto>> GetOrderDetailsByCustomer(string userId, Guid orderId, bool requestByAdmin);
        Task<CommonResponse> ProcessOrder(string claimCode, string membershipCode, string remarks);
        Task<CommonResponse<List<CustomerOrdersDto>>> GetCustomerOrders(string userId);
        Task<CommonResponse<List<CustomerOrdersDto>>> GetAllOrders(string status);
    }
}
