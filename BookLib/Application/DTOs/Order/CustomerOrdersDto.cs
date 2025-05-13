using Org.BouncyCastle.Bcpg;

namespace BookLib.Application.DTOs.Order
{
    public class CustomerOrdersDto
    {
        public Guid OrderId { get; set; }
        public string Status { get; set; }
        public string OrderCode { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime OrderDate { get; set; }   
        public string ClaimCode { get; set; }
        public string MembershipCode { get; set; }

    }
}
