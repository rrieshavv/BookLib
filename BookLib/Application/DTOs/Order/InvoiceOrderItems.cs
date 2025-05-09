using BookLib.Infrastructure.Data.Entities;

namespace BookLib.Application.DTOs.Order
{
    public class InvoiceOrderItems:OrderItems
    {
        public string BookTitle { get; set; }
    }

}
