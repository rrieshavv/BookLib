using BookLib.Application.DTOs.Order;
using BookLib.Infrastructure.Data;
using BookLib.Models;

namespace BookLib.Application.Services
{
    public class OrderService : IOrderService
    {
        public readonly ApplicationDbContext _context;
        public readonly IEmailService _emailService;
        public OrderService(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }
        public Task<CommonResponse> CreateOrder(OrderDto orderDto)
        {
            throw new NotImplementedException();
        }
    }
}
