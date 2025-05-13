namespace BookLib.Application.DTOs.Inventory
{
    public class InventoryUpdateDto
    {
        public int Quantity { get; set; }
        public string CompanyName { get; set; }
        public string CompanyRegNo { get; set; }
        public string CompanyAddress { get; set; }
        public decimal PricePerBook { get; set; }
        public decimal Discount { get; set; }
    }
}
