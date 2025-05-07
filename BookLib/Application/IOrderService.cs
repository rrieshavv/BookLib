using BookLib.Application.DTOs.Order;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IOrderService
    {
        Task<CommonResponse> CreateOrder(OrderDto orderDto);
    }
}
