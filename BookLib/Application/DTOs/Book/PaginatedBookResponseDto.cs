namespace BookLib.Application.DTOs.Book
{
    public class PaginatedBookResponseDto
    {
        public List<BookDto> Books { get; set; }
        public int PerPageCount { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasPrevious => PageNumber > 1;
        public bool HasNext => PageNumber < TotalPages;
    }

}
