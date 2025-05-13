using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLib.Application.Data.Entities
{
    [Table("publishers")]
    public class Publisher
    {
        [Key]
        public Guid publisher_id { get; set; }
        public string name { get; set; }
        
        public ICollection<Book> books { get; set; }
        
    }
}
