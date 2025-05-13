using System.ComponentModel.DataAnnotations;

namespace BookLib.Application.DTOs.Book
{
    public class BookUpdateDto
    {
        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        [Required]
        [StringLength(50)]
        public string ISBN { get; set; }

        [Required]
        public DateTime PublicationDate { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        [Required]
        [StringLength(50)]
        public string Language { get; set; }

        [Required]
        [StringLength(255)]
        public string Format { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int StockQty { get; set; }

        public bool IsOnSale { get; set; }

        [Required]
        public List<Guid> AuthorIds { get; set; }

        [Required]
        public List<Guid> GenreIds { get; set; }

        [Required]
        public List<Guid> PublisherIds { get; set; }

        public IFormFile? ImageFile { get; set; }

    }
}
