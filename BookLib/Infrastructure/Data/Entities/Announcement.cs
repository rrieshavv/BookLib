using System.ComponentModel.DataAnnotations;

namespace BookLib.Infrastructure.Data.Entities
{
    public class Announcement
    {
        [Key]
        public Guid announcement_id { get; set; }
        
        [Required]
        [Length(1,255)]
        public string title { get; set; }

        [Length(1, 500)]
        public string? description { get; set; }

        public DateTime display_start_ts { get; set; }
        
        public DateTime display_end_ts { get; set; }

        public bool is_active { get; set; }

        public DateTime created_ts { get; set; }

        public DateTime updated_ts { get; set; }
        
        [Required]
        public string created_by { get; set; }

        public string? updated_by { get; set; }

    }
}
