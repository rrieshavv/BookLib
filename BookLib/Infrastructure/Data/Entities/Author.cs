using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLib.Infrastructure.Data.Entities
{
    [Table("authors")]
    public class Author
    {
        [Key]
        public Guid author_id{ get; set; }
        public string name { get; set; }
        public string Name { get; internal set; }
        public ICollection<Book> books { get; set; }
        public Guid Id { get; internal set; }
    }
}
