using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLib.Infrastructure.Data.Entities
{
    public class Reviews
    {
        [Key]
        public Guid review_id { get; set; }

        public string user_id { get; set; }

        public Guid book_id { get; set; }

        public string review_message { get; set; }

        [Range(0, 5, ErrorMessage = "Rating must be between 0 and 5.")]
        public decimal rating { get; set; }

        public DateTime created_date { get; set; }

        [ForeignKey("user_id")]
        public virtual ApplicationUser UserDetails { get; set; }

        [ForeignKey("book_id")]
        public virtual Book BookDetails { get; set; }
    }
}
