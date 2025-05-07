namespace BookLib.Application.DTOs.Order
{
    public class OrderDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string ZIP { get; set; }
        public string City { get; set; }
        public string AddrLine1 { get; set; }
        public string AddrLine2 { get; set; }
        public string PhoneNumber { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
    }
}
