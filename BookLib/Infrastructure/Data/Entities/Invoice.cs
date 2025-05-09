using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Data.Entities
{
    public class Invoice
    {
        [Key]
        [ForeignKey("Order")]
        public Guid invoice_id { get; set; }
        public string invoice_no { get; set; }
        public string status { get; set; }

        public DateTime issued_ts { get; set; }
        public DateTime cleard_ts { get; set; }

        [Precision(10, 2)]
        public decimal total_amount { get; set; }

        [Precision(10, 2)]
        public decimal bulk_discount_percentage { get; set; }

        [Precision(10,2)]
        public decimal bulk_discount { get; set; }

        [Precision(10,2)]
        public decimal grand_total_amount { get; set; }

        public string? remarks { get; set; }
        
        public Order Order { get; set; }
    }
}
