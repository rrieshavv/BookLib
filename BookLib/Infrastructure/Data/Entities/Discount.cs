using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Data.Entities
{
    public class Discount
    {
        [Key]
        public Guid discount_id { get; set; }
        public Guid book_id { get; set; }
        public string title { get; set; }

        [Precision(4,2)]
        public decimal discount_percentage { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }


        [ForeignKey("book_id")]
        public virtual Book BookDetails { get; set; } 
    }
}
