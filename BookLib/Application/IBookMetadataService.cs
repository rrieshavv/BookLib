using BookLib.Application.DTOs.Book;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IBookMetaDataService
    {
        // Author operations
        Task<CommonResponse<AuthorDto>> CreateAuthorAsync(string name, string username);
        Task<CommonResponse<AuthorDto>> UpdateAuthorAsync(Guid id, string name, string username);
        Task<CommonResponse<bool>> DeleteAuthorAsync(Guid id);
        Task<CommonResponse<List<AuthorDto>>> GetAllAuthorsAsync();
        Task<CommonResponse<AuthorDto>> GetAuthorByIdAsync(Guid id);

        // Publisher operations
        Task<CommonResponse<PublisherDto>> CreatePublisherAsync(string name, string username);
        Task<CommonResponse<PublisherDto>> UpdatePublisherAsync(Guid id, string name, string username);
        Task<CommonResponse<bool>> DeletePublisherAsync(Guid id);
        Task<CommonResponse<List<PublisherDto>>> GetAllPublishersAsync();
        Task<CommonResponse<PublisherDto>> GetPublisherByIdAsync(Guid id);

        // Genre operations
        Task<CommonResponse<GenreDto>> CreateGenreAsync(string name, string username);
        Task<CommonResponse<GenreDto>> UpdateGenreAsync(Guid id, string name, string username);
        Task<CommonResponse<bool>> DeleteGenreAsync(Guid id);
        Task<CommonResponse<List<GenreDto>>> GetAllGenresAsync();
        Task<CommonResponse<GenreDto>> GetGenreByIdAsync(Guid id);
    }
}