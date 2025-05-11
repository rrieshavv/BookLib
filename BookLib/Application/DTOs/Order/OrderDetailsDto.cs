using System.Diagnostics.Metrics;

namespace BookLib.Application.DTOs.Order
{
    public class OrderDetailsDto
    {
        public string OrderCode { get; set; }
        public string ClaimCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string InvoiceCode { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal BulkDiscount { get; set; }
        public decimal GrandTotalAmount { get; set; }
        public List<OrderDetailsItemDto> OrderItems { get; set; }

    }
}
