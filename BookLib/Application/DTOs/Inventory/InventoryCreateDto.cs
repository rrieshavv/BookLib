namespace BookLib.Application.DTOs.Inventory
{
    public class InventoryCreateDto
    {
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
        public string CompanyName { get; set; }
        public string CompanyRegNo { get; set; }
        public string CompanyAddress { get; set; }
        public decimal PricePerBook { get; set; }
        public decimal Discount { get; set; }
    }
}
