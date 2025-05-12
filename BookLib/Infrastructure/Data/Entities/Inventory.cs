using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Data.Entities
{
    public class Inventory
    {
        [Key]
        public Guid id { get; set; }

        public Guid book_id { get; set; }

        public int quantity { get; set; }

        [Precision(10, 2)]
        public decimal price_per_book { get; set; }

        [Precision(10, 2)]
        public decimal discount { get; set; }

        [Precision(10, 2)]
        public decimal total_amount { get; set; }

        public DateTime created_at { get; set; }

        [ForeignKey("book_id")]
        public virtual Book Book { get; set; }
    }
}
