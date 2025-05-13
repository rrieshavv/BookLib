namespace BookLib.Application.DTOs.Book
{

    public class BookFilterDto
    {
        public string? SearchTerm { get; set; }
        public List<Guid>? AuthorIds { get; set; }
        public List<Guid>? GenreIds { get; set; }
        public List<Guid>? PublisherIds { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string? Language { get; set; }
        public string? Format { get; set; }
        public bool? InStock { get; set; }
        public bool? OnSale { get; set; }
        public int? MinRating { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SortBy { get; set; } = "title";
        public bool SortAscending { get; set; } = true;
    }

}
