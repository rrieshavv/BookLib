using System.ComponentModel.DataAnnotations;

namespace BookLib.Application.DTOs.Book
{
    public class BookDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string ISBN { get; set; }

        public DateTime PublicationDate { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string Language { get; set; }

        public string Format { get; set; }

        public int StockQty { get; set; }

        public bool IsOnSale { get; set; }

        public DateTime CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public List<AuthorDto> Authors { get; set; }

        public List<GenreDto> Genres { get; set; }

        public List<PublisherDto> Publishers { get; set; }
    }

    public class BookCreateDto
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
    }

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
    }

    public class BookFilterDto
    {
        public string SearchTerm { get; set; }
        public List<Guid> AuthorIds { get; set; }
        public List<Guid> GenreIds { get; set; }
        public List<Guid> PublisherIds { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string Language { get; set; }
        public string Format { get; set; }
        public bool? InStock { get; set; }
        public bool? OnSale { get; set; }
        public int? MinRating { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SortBy { get; set; } = "title";
        public bool SortAscending { get; set; } = true;
    }

    public class PaginatedBookResponseDto
    {
        public List<BookDto> Books { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasPrevious => PageNumber > 1;
        public bool HasNext => PageNumber < TotalPages;
    }


}
