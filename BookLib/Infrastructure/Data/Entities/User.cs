using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Data.Entities
{
    [Table("users")]
    [Index(nameof(username))]
    [Index(nameof(email))]
    [Index(nameof(mobile))]
    public class User
    {
        [Key]
        public Guid user_id { get; set; }

        public string role { get; set; }

        [StringLength(20)]
        public string username { get; set; }

        [StringLength(100)]
        public string email { get; set; }

        [StringLength(15)]
        public string mobile { get; set; }

        public string password { get; set; }

        [StringLength(50)]
        public string firstname { get; set; }

        [StringLength(50)]
        public string lastname { get; set; }

        [StringLength(100)]
        public string? country {get;set;}

        [StringLength(100)]
        public string? city  {get;set;}
        public string? address { get; set; }
        
        public DateTime registration_date { get; set; }
   
    }

    public enum UserRole
    {
        admin,
        customer
    }
}
