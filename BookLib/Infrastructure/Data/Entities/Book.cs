using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLib.Infrastructure.Data.Entities
{
    [Table("books")]
    public class Book
    {
        [Key]
        public Guid book_id { get; set; }

        [StringLength(255)]
        public string title { get; set; }

        [StringLength(50)]
        public string isbn { get; set; }
        public DateTime publication_date { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }


        [StringLength(50)]
        public string language { get; set; }
       

        [StringLength(255)]
        public string format { get; set; }
        public int stock_qty { get; set; }
        public bool is_on_sale { get; set; }
        public string? image_url { get; set; }
        public DateTime created_date { get; set; }


        [StringLength(50)]
        public string created_by { get; set; }
        public DateTime updated_date { get; set; }


        [StringLength(50)]
        public string updated_by { get; set; }
        public ICollection<Author> authors { get; set; }
        public ICollection<Genre> genres { get; set; }
        public ICollection<Publisher> publishers { get; set; }
    }
}
