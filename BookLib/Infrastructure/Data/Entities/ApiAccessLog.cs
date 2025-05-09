using System.ComponentModel.DataAnnotations;

namespace BookLib.Infrastructure.Data.Entities
{
    public class ApiAccessLog
    {
        [Key]
        public int Id { get; set; }
        public string? Username {get;set;}
        public string? Action {get;set;}
        public string? IpAddress {get;set;}
        public string? UserAgent {get;set;}
        public DateTime Timestamp {get;set;}
        public string? Details {get;set;}
    }
}

