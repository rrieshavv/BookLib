using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLib.Infrastructure.Data.Entities
{
    public class Order
    {
        [Key]
        public Guid order_id { get; set; }

        [StringLength(8)]
        public string order_code { get; set; }

        public string user_id { get; set; }

        [Timestamp]
        public DateTime created_ts { get; set; }

        [Timestamp]
        public DateTime cleared_ts { get; set; }

        public string? cleared_by { get; set; }

        [Timestamp]
        public DateTime cancelled_ts { get; set; }

        public string? cancelled_by { get; set; }

        [StringLength(50)]
        public string? status { get; set; }

        public string claim_code { get; set; }

        // billing informations

        public string first_name { get; set; }

        public string last_name { get; set; }

        [StringLength(50)]
        public string phone { get; set; }

        [StringLength(500)]
        public string address_line_1 { get; set; }

        [StringLength(500)]
        public string? address_line_2 { get; set; }

        [StringLength(100)]
        public string city { get; set; }

        [StringLength(100)]
        public string state { get; set; }

        [StringLength(10)]
        public string zip_code { get; set; }

        [StringLength(100)]
        public string country { get; set; }

        [ForeignKey("user_id")]
        public virtual ApplicationUser UserDetails { get; set; }

    }
}

