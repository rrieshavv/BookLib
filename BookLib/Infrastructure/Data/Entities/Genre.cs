using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLib.Infrastructure.Data.Entities
{
    [Table("genres")]
    public class Genre
    {
        [Key]
        public Guid genre_id { get; set; }
        public string name { get; set; }
        public string Name { get; internal set; }
        public ICollection<Book> books { get; set; }
        public Guid Id { get; internal set; }
    }
}
