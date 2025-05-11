using BookLib.Infrastructure.Data.Entities;

namespace BookLib.Application.DTOs.Order
{
    public class OrderDetailsItemDto
    {
        public Guid BookId{get;set;}
        public string BookName{get;set;}
        public string AuthorName{get;set;}
        public string PublisherName{get;set;}
        public decimal Quantity{get;set;}
        public decimal Price{get;set;}
        public decimal Discount{get;set;}
        public decimal TotalPrice { get; set; }
    }
}
