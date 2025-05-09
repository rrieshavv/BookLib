using System.ComponentModel.DataAnnotations;

namespace BookLib.Infrastructure.Data.Entities
{
    public class ErrorLog
    {
        [Key]
        public int Id { get; set; }
        public string? Message { get; set; }
        public string? StackTrace { get; set; }
        public string? Source { get; set; }
        public string? Path { get; set; }
        public string? UserName { get; set; }
        public DateTime Timestamp { get; set; } 
    }
}
