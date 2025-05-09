namespace BookLib.Application.DTOs.Order
{
    public class OrderCancelDto
    {
        public Guid OrderId { get; set; }
        public string Password { get; set; }
    }
}
