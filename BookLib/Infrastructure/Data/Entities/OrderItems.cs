using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Data.Entities
{
    public class OrderItems
    {
        [Key]
        public int order_item_id { get; set; }
        public Guid order_id { get; set; }
        public Guid book_id { get; set; }

        [Range(1,100)]
        public int quantity { get; set; }

        [Precision(10,2)]
        public decimal price { get; set; }

        [Precision(10, 2)]
        public decimal discount { get; set; }

        [Precision(4, 2)]
        public decimal discount_percentage { get; set; }

        public string? discount_title { get; set; }

        [Precision(10, 2)]
        public decimal total_price { get; set; }

        [ForeignKey("order_id")]
        public virtual Order OrderDetails { get; set; }


        [ForeignKey("book_id")]
        public virtual Book BookDetails { get; set; }
    }
}
