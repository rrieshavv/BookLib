namespace BookLib.Application.DTOs.Book
{
    public class BookReviewDto
    {
        public string UserId { get; set; }
        public Guid BookId { get; set; }
        public string Review { get; set; }
        public int Rating { get; set; }
    }
}
