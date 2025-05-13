using BookLib.Application.DTOs.Book;
using BookLib.Infrastructure.Data;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Application.Services
{
    public class BookMetaDataService : IBookMetaDataService
    {
        private readonly ApplicationDbContext _context;

        public BookMetaDataService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Author operations
        public async Task<CommonResponse<AuthorDto>> CreateAuthorAsync(string name, string username)
        {
            var response = new CommonResponse<AuthorDto>();

            try
            {
                var author = new Author
                {
                    author_id = Guid.NewGuid(),
                    name = name
                };

                _context.Authors.Add(author);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Author created successfully";
                response.Data = new AuthorDto { Id = author.author_id, Name = author.name };
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<AuthorDto>> UpdateAuthorAsync(Guid id, string name, string username)
        {
            var response = new CommonResponse<AuthorDto>();

            try
            {
                var author = await _context.Authors.FindAsync(id);
                if (author == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Author not found";
                    return response;
                }

                author.name = name;
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Author updated successfully";
                response.Data = new AuthorDto { Id = author.author_id, Name = author.name };
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<bool>> DeleteAuthorAsync(Guid id)
        {
            var response = new CommonResponse<bool>();

            try
            {
                var author = await _context.Authors.FindAsync(id);
                if (author == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Author not found";
                    return response;
                }

                _context.Authors.Remove(author);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Author deleted successfully";
                response.Data = true;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<List<AuthorDto>>> GetAllAuthorsAsync()
        {
            var response = new CommonResponse<List<AuthorDto>>();

            try
            {
                var authors = await _context.Authors
                    .Select(a => new AuthorDto
                    {
                        Id = a.author_id,
                        Name = a.name
                    })
                    .ToListAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Authors retrieved successfully";
                response.Data = authors;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        // Publisher operations
        public async Task<CommonResponse<PublisherDto>> CreatePublisherAsync(string name, string username)
        {
            var response = new CommonResponse<PublisherDto>();

            try
            {
                var publisher = new Publisher
                {
                    publisher_id = Guid.NewGuid(),
                    name = name
                };

                _context.Publishers.Add(publisher);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Publisher created successfully";
                response.Data = new PublisherDto { Id = publisher.publisher_id, Name = publisher.name };
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<PublisherDto>> UpdatePublisherAsync(Guid id, string name, string username)
        {
            var response = new CommonResponse<PublisherDto>();

            try
            {
                var publisher = await _context.Publishers.FindAsync(id);
                if (publisher == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Publisher not found";
                    return response;
                }

                publisher.name = name;
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Publisher updated successfully";
                response.Data = new PublisherDto { Id = publisher.publisher_id, Name = publisher.name };
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<bool>> DeletePublisherAsync(Guid id)
        {
            var response = new CommonResponse<bool>();

            try
            {
                var publisher = await _context.Publishers.FindAsync(id);
                if (publisher == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Publisher not found";
                    return response;
                }

                _context.Publishers.Remove(publisher);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Publisher deleted successfully";
                response.Data = true;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<List<PublisherDto>>> GetAllPublishersAsync()
        {
            var response = new CommonResponse<List<PublisherDto>>();

            try
            {
                var publishers = await _context.Publishers
                    .Select(p => new PublisherDto
                    {
                        Id = p.publisher_id,
                        Name = p.name
                    })
                    .ToListAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Publishers retrieved successfully";
                response.Data = publishers;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        // Genre operations
        public async Task<CommonResponse<GenreDto>> CreateGenreAsync(string name, string username)
        {
            var response = new CommonResponse<GenreDto>();

            try
            {
                var genre = new Genre
                {
                    genre_id = Guid.NewGuid(),
                    name = name
                };

                _context.Genres.Add(genre);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Genre created successfully";
                response.Data = new GenreDto { Id = genre.genre_id, Name = genre.name };
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<GenreDto>> UpdateGenreAsync(Guid id, string name, string username)
        {
            var response = new CommonResponse<GenreDto>();

            try
            {
                var genre = await _context.Genres.FindAsync(id);
                if (genre == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Genre not found";
                    return response;
                }

                genre.name = name;
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Genre updated successfully";
                response.Data = new GenreDto { Id = genre.genre_id, Name = genre.name };
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<bool>> DeleteGenreAsync(Guid id)
        {
            var response = new CommonResponse<bool>();

            try
            {
                var genre = await _context.Genres.FindAsync(id);
                if (genre == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Genre not found";
                    return response;
                }

                _context.Genres.Remove(genre);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Genre deleted successfully";
                response.Data = true;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }

        public async Task<CommonResponse<List<GenreDto>>> GetAllGenresAsync()
        {
            var response = new CommonResponse<List<GenreDto>>();

            try
            {
                var genres = await _context.Genres
                    .Select(g => new GenreDto
                    {
                        Id = g.genre_id,
                        Name = g.name
                    })
                    .ToListAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Genres retrieved successfully";
                response.Data = genres;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}