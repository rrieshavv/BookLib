using BookLib.Application.DTOs.Book;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IBookService
    {
        Task<CommonResponse<BookDto>> GetBookByIdAsync(Guid id);
        Task<CommonResponse<PaginatedBookResponseDto>> GetBooksAsync(BookFilterDto filterDto);
        Task<CommonResponse<BookDto>> AddBookAsync(BookCreateDto bookDto, string username);
        Task<CommonResponse<BookDto>> UpdateBookAsync(Guid id, BookUpdateDto bookDto, string username);
        Task<CommonResponse<bool>> DeleteBookAsync(Guid id);
        Task<CommonResponse<int>> GetTotalBooksCountAsync();
        Task<CommonResponse<List<BookDto>>> GetNewestBooksAsync(int count);
        Task<CommonResponse<List<BookDto>>> GetBestsellerBooksAsync(int count);
        Task<CommonResponse<List<BookDto>>> GetOnSaleBooksAsync(int count);

    }
}
