using BookLib.Application.DTOs.Book;
using BookLib.Infrastructure.Data;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Application.Services
{
    public class BookService : IBookService
    {
        private readonly ApplicationDbContext _context;

        public BookService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CommonResponse<BookDto>> AddBookAsync(BookCreateDto bookDto, string username)
        {
            CommonResponse<BookDto> response = new CommonResponse<BookDto>();

            try
            {
                var book = new Book
                {
                    book_id = Guid.NewGuid(),
                    title = bookDto.Title,
                    isbn = bookDto.ISBN,
                    publication_date = bookDto.PublicationDate,
                    description = bookDto.Description,
                    price = bookDto.Price,
                    language = bookDto.Language,
                    format = bookDto.Format,
                    stock_qty = bookDto.StockQty,
                    is_on_sale = bookDto.IsOnSale,
                    created_date = DateTime.Now,
                    created_by = username,
                    updated_date = DateTime.Now,
                    updated_by = username,
                    authors = new List<Author>(),
                    genres = new List<Genre>(),
                    publishers = new List<Publisher>()
                };

                if (bookDto.AuthorIds != null && bookDto.AuthorIds.Any())
                {
                    foreach (var authorId in bookDto.AuthorIds)
                    {
                        var author = await _context.Authors.FindAsync(authorId);
                        if (author != null)
                        {
                            book.authors.Add(author);
                        }
                    }
                }

                if (bookDto.GenreIds != null && bookDto.GenreIds.Any())
                {
                    foreach (var genreId in bookDto.GenreIds)
                    {
                        var genre = await _context.Genres.FindAsync(genreId);
                        if (genre != null)
                        {
                            book.genres.Add(genre);
                        }
                    }
                }

                if (bookDto.PublisherIds != null && bookDto.PublisherIds.Any())
                {
                    foreach (var publisherId in bookDto.PublisherIds)
                    {
                        var publisher = await _context.Publishers.FindAsync(publisherId);
                        if (publisher != null)
                        {
                            book.publishers.Add(publisher);
                        }
                    }
                }

                await _context.Books.AddAsync(book);
                await _context.SaveChangesAsync();

                var bookDtoMap = MapToBookDto(book);

                response.Code = ResponseCode.Success;
                response.Message = "Book added successfully";
                response.Data = bookDtoMap;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }


        public async Task<CommonResponse<bool>> DeleteBookAsync(Guid id)
        {
            CommonResponse<bool> response = new CommonResponse<bool>();

            try
            {
                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Book not found";
                    response.Data = false;
                    return response;
                }

                _context.Books.Remove(book);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Book deleted successfully";
                response.Data = true;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                response.Data = false;
                return response;
            }
        }


        public async Task<CommonResponse<List<BookDto>>> GetBestsellerBooksAsync(int count)
        {
            throw new NotImplementedException();
        }

        public async Task<CommonResponse<BookDto>> GetBookByIdAsync(Guid id)
        {
            CommonResponse<BookDto> response = new CommonResponse<BookDto>();

            try
            {
                var book = await _context.Books
                    .Include(b => b.authors)
                    .Include(b => b.genres)
                    .Include(b => b.publishers)
                    .FirstOrDefaultAsync(b => b.book_id == id);

                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Book not found";
                    return response;
                }

                var bookDto = MapToBookDto(book);

                response.Code = ResponseCode.Success;
                response.Message = "Book retrieved successfully";
                response.Data = bookDto;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<CommonResponse<PaginatedBookResponseDto>> GetBooksAsync(BookFilterDto filterDto)
        {
            CommonResponse<PaginatedBookResponseDto> response = new CommonResponse<PaginatedBookResponseDto>();

            try
            {
                IQueryable<Book> query = _context.Books
                    .Include(b => b.authors)
                    .Include(b => b.genres)
                    .Include(b => b.publishers);

                query = query.OrderByDescending(b => b.created_date);
                int totalCount = await query.CountAsync();

                var books = await query
                    .Skip((filterDto.PageNumber - 1) * filterDto.PageSize)
                    .Take(filterDto.PageSize)
                    .ToListAsync();

                var bookDtos = books.Select(MapToBookDto).ToList();

                var paginatedResponse = new PaginatedBookResponseDto
                {
                    Books = bookDtos,
                    TotalCount = totalCount,
                    PageNumber = filterDto.PageNumber,
                    PageSize = filterDto.PageSize,
                    TotalPages = (int)Math.Ceiling(totalCount / (double)filterDto.PageSize)
                };

                response.Code = ResponseCode.Success;
                response.Message = "Books retrieved successfully";
                response.Data = paginatedResponse;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }


        public Task<CommonResponse<List<BookDto>>> GetNewestBooksAsync(int count)
        {
            throw new NotImplementedException();
        }

        public Task<CommonResponse<List<BookDto>>> GetOnSaleBooksAsync(int count)
        {
            throw new NotImplementedException();
        }

        public Task<CommonResponse<int>> GetTotalBooksCountAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<CommonResponse<BookDto>> UpdateBookAsync(Guid id, BookUpdateDto bookDto, string username)
        {
            CommonResponse<BookDto> response = new CommonResponse<BookDto>();

            try
            {
                var book = await _context.Books
                    .Include(b => b.authors)
                    .Include(b => b.genres)
                    .Include(b => b.publishers)
                    .FirstOrDefaultAsync(b => b.book_id == id);

                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Book not found";
                    return response;
                }

                book.title = bookDto.Title;
                book.isbn = bookDto.ISBN;
                book.publication_date = bookDto.PublicationDate;
                book.description = bookDto.Description;
                book.price = bookDto.Price;
                book.language = bookDto.Language;
                book.format = bookDto.Format;
                book.stock_qty = bookDto.StockQty;
                book.is_on_sale = bookDto.IsOnSale;
                book.updated_date = DateTime.Now;
                book.updated_by = username;

                book.authors.Clear();
                if (bookDto.AuthorIds != null)
                {
                    foreach (var authorId in bookDto.AuthorIds)
                    {
                        var author = await _context.Authors.FindAsync(authorId);
                        if (author != null)
                        {
                            book.authors.Add(author);
                        }
                    }
                }

                book.genres.Clear();
                if (bookDto.GenreIds != null)
                {
                    foreach (var genreId in bookDto.GenreIds)
                    {
                        var genre = await _context.Genres.FindAsync(genreId);
                        if (genre != null)
                        {
                            book.genres.Add(genre);
                        }
                    }
                }

                book.publishers.Clear();
                if (bookDto.PublisherIds != null)
                {
                    foreach (var publisherId in bookDto.PublisherIds)
                    {
                        var publisher = await _context.Publishers.FindAsync(publisherId);
                        if (publisher != null)
                        {
                            book.publishers.Add(publisher);
                        }
                    }
                }

                _context.Books.Update(book);
                await _context.SaveChangesAsync();

                var updatedBookDto = MapToBookDto(book);

                response.Code = ResponseCode.Success;
                response.Message = "Book updated successfully";
                response.Data = updatedBookDto;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }




        private BookDto MapToBookDto(Book book) => new BookDto
        {
            Id = book.book_id,
            Title = book.title,
            ISBN = book.isbn,
            PublicationDate = book.publication_date,
            Description = book.description,
            Price = book.price,
            Language = book.language,
            Format = book.format,
            StockQty = book.stock_qty,
            IsOnSale = book.is_on_sale,
            CreatedDate = book.created_date,
            CreatedBy = book.created_by,
            UpdatedDate = book.updated_date,
            UpdatedBy = book.updated_by,
            Authors = book.authors?.Select(a => new AuthorDto { Id = a.author_id, Name = a.name }).ToList() ?? [],
            Genres = book.genres?.Select(g => new GenreDto { Id = g.genre_id, Name = g.name }).ToList() ?? [],
            Publishers = book.publishers?.Select(p => new PublisherDto { Id = p.publisher_id, Name = p.name }).ToList() ?? []
        };




    }
}
