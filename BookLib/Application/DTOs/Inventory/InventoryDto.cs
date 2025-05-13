using System.ComponentModel.DataAnnotations;

namespace BookLib.Application.DTOs.Inventory
{

    public class InventoryDto
    {
        public Guid Id { get; set; }
        public Guid BookId { get; set; }
        public int Quantity { get; set; }
        public string CompanyName { get; set; }
        public string CompanyRegNo { get; set; }
        public string CompanyAddress { get; set; }
        public decimal PricePerBook { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public string BookTitle { get; set; }
    }

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
