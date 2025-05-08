using System.ComponentModel.DataAnnotations;

namespace BookLib.Application.DTOs.Book
{
    public class DiscountDto
    {
        public Guid DiscountId { get; set; }
        public Guid BookId { get; set; }
        public string Title { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string BookTitle { get; set; }

    }

    public class DiscountCreateDto
    {
        [Required]
        public Guid BookId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; }

        [Required]
        [Range(0.01, 100.00)]
        public decimal DiscountPercentage { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }

    public class DiscountUpdateDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; }

        [Required]
        [Range(0.01, 100.00)]
        public decimal DiscountPercentage { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }

    public class DiscountFilterDto
    {
        public Guid? BookId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? Title { get; set; }
        public decimal? MinDiscountPercentage { get; set; }
        public decimal? MaxDiscountPercentage { get; set; }
        public bool? IsActive { get; set; } 
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SortBy { get; set; } = "start_date";
        public bool SortAscending { get; set; } = true;
    }

    public class PaginatedDiscountResponseDto
    {
        public List<DiscountDto> Discounts { get; set; }
        public int PerPageCount { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasPrevious => PageNumber > 1;
        public bool HasNext => PageNumber < TotalPages;
    }









}
