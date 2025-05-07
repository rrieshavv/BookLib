namespace BookLib.Application.DTOs.Order
{
    public class OrderItemDto
    {
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
    }
}
