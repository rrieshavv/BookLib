using BookLib.Application.DTOs.Book;
using BookLib.Infrastructure.Common;

namespace BookLib.Application.Interface
{
    public interface IBookService
    {


        Task<CommonResponse<BookDto>> GetBookByIdAsyn(Guid id);
        Task<CommonResponse<BookDto>> GetBookByName(string bookName);
        Task<CommonResponse<PaginatedBookResponseDto>> GetBooksAsync(BookFilterDto filterDto);
        Task<CommonResponse<BookDto>> AddBookAsync(BookCreateDto bookDto, string username);
        Task<CommonResponse<BookDto>> UpdateBookAsync(Guid id, BookUpdateDto bookDto, string username);
        Task<CommonResponse<bool>> DeleteBookAsync(Guid id);
        Task<CommonResponse<List<BookDto>>> GetBestsellerBooksAsync(int count);

        Task<CommonResponse<List<AuthorDto>>> GetAllAuthorsAsync();
        Task<CommonResponse<List<GenreDto>>> GetAllGenresAsync();
        Task<CommonResponse<List<PublisherDto>>> GetAllPublishersAsync();
        Task<CommonResponse<List<string>>> GetAllLanguagesAsync(); 
        Task<CommonResponse<List<string>>> GetAllFormatsAsync();





    }
}
