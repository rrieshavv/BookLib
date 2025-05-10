using BookLib.Application.DTOs.Book;
using BookLib.Infrastructure.Configurations;
using BookLib.Infrastructure.Data;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MailKit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;



namespace BookLib.Application.Services
{
    public class BookService : IBookService
    {
        private readonly ApplicationDbContext _context;
        private readonly IImageService _imageService;


        public BookService(ApplicationDbContext context, IImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }




        public async Task<CommonResponse<BookDto>> AddBookAsync(BookCreateDto bookDto, string username)
        {
            CommonResponse<BookDto> response = new CommonResponse<BookDto>();

            try
            {

                var authors = await _context.Authors
                     .Where(a => bookDto.AuthorIds.Contains(a.author_id))
                     .ToListAsync();

                var genres = await _context.Genres
                    .Where(g => bookDto.GenreIds.Contains(g.genre_id))
                    .ToListAsync();

                var publishers = await _context.Publishers
                    .Where(p => bookDto.PublisherIds.Contains(p.publisher_id))
                    .ToListAsync();


                var book = new Book
                {
                    book_id = Guid.NewGuid(),
                    title = bookDto.Title,
                    isbn = bookDto.ISBN,
                    publication_date = DateTime.SpecifyKind(bookDto.PublicationDate, DateTimeKind.Utc),
                    description = bookDto.Description,
                    price = bookDto.Price,
                    language = bookDto.Language,
                    format = bookDto.Format,
                    stock_qty = bookDto.StockQty,
                    is_on_sale = bookDto.IsOnSale,
                    created_date = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc),
                    created_by = username,
                    updated_date = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc),
                    updated_by = username,
                    authors = authors,
                    genres = genres,
                    publishers = publishers,

                };

                if (bookDto.ImageFile != null && bookDto.ImageFile.Length > 0)
                {

                    var uploadResult = await _imageService.UploadImageAsync(bookDto.ImageFile, "books", book.book_id.ToString(), 500, 700, "fill");

                    if (uploadResult != null)
                    {
                        book.image_url = uploadResult.SecureUrl.ToString();
                    }


                }


                await _context.Books.AddAsync(book);
                await _context.SaveChangesAsync();

                var bookDtoMap = MapToBookDto(book);



                response.Code = ResponseCode.Success;
                response.Message = "Book Added successfully";
                response.Data = null;
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

                if (!string.IsNullOrEmpty(book.image_url))
                {
                    var publicId = ExtractPublicIdFromUrl(book.image_url);
                    if (!string.IsNullOrEmpty(publicId))
                    {
                        await _imageService.DeleteImageAsync(publicId);
                    }
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


        public async Task<CommonResponse<BookDto>> GetBookByIdAsyn(Guid id)
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

        public async Task<CommonResponse<BookDto>> GetBookByName(string bookName)
        {
            CommonResponse<BookDto> response = new CommonResponse<BookDto>();

            try
            {
                var book = await _context.Books
                    .Include(b => b.authors)
                    .Include(b => b.genres)
                    .Include(b => b.publishers)
                    .FirstOrDefaultAsync(b => EF.Functions.Like(b.title, $"%{bookName}%"));

                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Book not found with  similar name.";
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

                if (!string.IsNullOrEmpty(filterDto.SearchTerm))
                {
                    query = query.Where(b =>
                        b.title.Contains(filterDto.SearchTerm) ||
                        b.description.Contains(filterDto.SearchTerm) ||
                        b.isbn.Contains(filterDto.SearchTerm));
                }

                if (filterDto.AuthorIds != null && filterDto.AuthorIds.Any())
                {
                    query = query.Where(b => b.authors.Any(a => filterDto.AuthorIds.Contains(a.author_id)));
                }

                if (filterDto.GenreIds != null && filterDto.GenreIds.Any())
                {
                    query = query.Where(b => b.genres.Any(g => filterDto.GenreIds.Contains(g.genre_id)));
                }

                if (filterDto.PublisherIds != null && filterDto.PublisherIds.Any())
                {
                    query = query.Where(b => b.publishers.Any(p => filterDto.PublisherIds.Contains(p.publisher_id)));
                }

                if (filterDto.MinPrice.HasValue)
                {
                    query = query.Where(b => b.price >= filterDto.MinPrice.Value);
                }

                if (filterDto.MaxPrice.HasValue)
                {
                    query = query.Where(b => b.price <= filterDto.MaxPrice.Value);
                }

                if (!string.IsNullOrEmpty(filterDto.Language))
                {
                    query = query.Where(b => b.language == filterDto.Language);
                }

                if (!string.IsNullOrEmpty(filterDto.Format))
                {
                    query = query.Where(b => b.format == filterDto.Format);
                }

                if (filterDto.InStock.HasValue)
                {
                    query = query.Where(b => filterDto.InStock.Value ? b.stock_qty > 0 : b.stock_qty == 0);
                }

                if (filterDto.OnSale.HasValue)
                {
                    query = query.Where(b => b.is_on_sale == filterDto.OnSale.Value);
                }

                query = ApplySorting(query, filterDto.SortBy, filterDto.SortAscending);

                int totalCount = await query.CountAsync();
                int totalPages = (int)Math.Ceiling(totalCount / (double)filterDto.PageSize);
                int perPageCount;

                if (filterDto.PageNumber < totalPages)
                {
                    perPageCount = filterDto.PageSize;
                }
                else
                {
                    perPageCount = totalCount - ((totalPages - 1) * filterDto.PageSize);
                }


                var pagedBooks = await query
                    .Skip((filterDto.PageNumber - 1) * filterDto.PageSize)
                    .Take(filterDto.PageSize)
                    .ToListAsync();

                List<BookDto> bookDtoList = pagedBooks.Select(MapToBookDto).ToList();


                var paginatedResponse = new PaginatedBookResponseDto
                {
                    Books = bookDtoList,
                    TotalCount = totalCount,
                    PageNumber = filterDto.PageNumber,
                    PageSize = filterDto.PageSize,
                    TotalPages = totalPages,
                    PerPageCount = perPageCount,
                };

                response.Code = ResponseCode.Success;
                response.Message = "Books Retrieved Successfully";
                response.Data = paginatedResponse;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                response.Data = null;
            }
            return response;
        }

        private IQueryable<Book> ApplySorting(IQueryable<Book> query, string sortBy, bool sortAscending)
        {
            switch (sortBy.ToLower())
            {
                case "title":
                    return sortAscending ? query.OrderBy(b => b.title) : query.OrderByDescending(b => b.title);
                case "price":
                    return sortAscending ? query.OrderBy(b => b.price) : query.OrderByDescending(b => b.price);
                case "publicationdate":
                    return sortAscending ? query.OrderBy(b => b.publication_date) : query.OrderByDescending(b => b.publication_date);
                case "createddate":
                    return sortAscending ? query.OrderBy(b => b.created_date) : query.OrderByDescending(b => b.created_date);
                case "stockqty":
                    return sortAscending ? query.OrderBy(b => b.stock_qty) : query.OrderByDescending(b => b.stock_qty);
                case "isbn":
                    return sortAscending ? query.OrderBy(b => b.isbn) : query.OrderByDescending(b => b.isbn);
                default:
                    return sortAscending ? query.OrderBy(b => b.title) : query.OrderByDescending(b => b.title);
            }
        }


        public async Task<CommonResponse<BookDto>> UpdateBookAsync(Guid id, BookUpdateDto bookDto, string username)
        {
            var response = new CommonResponse<BookDto>();

            try
            {
                var book = await _context.Books
                    .Include(b => b.authors)
                    .Include(b => b.publishers)
                    .Include(b => b.genres)
                    .FirstOrDefaultAsync(b => b.book_id == id);

                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Book not found";
                    return response;
                }

                book.title = bookDto.Title;
                book.publication_date = bookDto.PublicationDate;
                book.language = bookDto.Language;
                book.stock_qty = bookDto.StockQty;
                book.is_on_sale = bookDto.IsOnSale;
                book.description = bookDto.Description;
                book.format = bookDto.Format;
                book.price = bookDto.Price;
                book.isbn = bookDto.ISBN;
                book.updated_by = username;
                book.updated_date = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);


                if (bookDto.ImageFile != null && bookDto.ImageFile.Length > 0)
                {
                    if (!string.IsNullOrEmpty(book.image_url))
                    {
                        var publicId = ExtractPublicIdFromUrl(book.image_url);

                        if (!string.IsNullOrEmpty(publicId))
                        {
                            await _imageService.DeleteImageAsync(publicId);
                        }
                    }

                    var uploadResult = await _imageService.UploadImageAsync(bookDto.ImageFile, "books", book.book_id.ToString(), 500, 700, "fill");

                    if (uploadResult != null)
                    {
                        book.image_url = uploadResult.SecureUrl.ToString();
                    }
                }

                if (bookDto.PublisherIds != null)
                {
                    book.publishers.Clear();

                    if (bookDto.PublisherIds.Any())
                    {
                        var publishers = await _context.Publishers
                            .Where(p => bookDto.PublisherIds.Contains(p.publisher_id))
                            .ToListAsync();

                        foreach (var publisher in publishers)
                        {
                            book.publishers.Add(publisher);
                        }
                    }
                }

                if (bookDto.AuthorIds != null)
                {
                    book.authors.Clear();

                    if (bookDto.AuthorIds.Any())
                    {
                        var authors = await _context.Authors
                            .Where(a => bookDto.AuthorIds.Contains(a.author_id))
                            .ToListAsync();

                        foreach (var author in authors)
                        {
                            book.authors.Add(author);
                        }
                    }
                }


                if (bookDto.GenreIds != null)
                {
                    book.genres.Clear();

                    if (bookDto.GenreIds.Any())
                    {
                        var genres = await _context.Genres
                            .Where(g => bookDto.GenreIds.Contains(g.genre_id))
                            .ToListAsync();

                        foreach (var genre in genres)
                        {
                            book.genres.Add(genre);
                        }
                    }
                }

                await _context.SaveChangesAsync();

                //var updatedBookDto = MapToBookDto(book);
                response.Code = ResponseCode.Success;
                response.Message = "Book updated successfully";
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
            }

            return response;
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
            Publishers = book.publishers?.Select(p => new PublisherDto { Id = p.publisher_id, Name = p.name }).ToList() ?? [],
            ImageUrl = book.image_url

        };


        private string ExtractPublicIdFromUrl(string imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl))
            {
                return null;
            };

            try
            {

                var uri = new Uri(imageUrl);
                var pathSegments = uri.AbsolutePath.Split('/');

                int uploadIndex = Array.IndexOf(pathSegments, "upload");
                if (uploadIndex >= 0 && uploadIndex < pathSegments.Length - 2)
                {
                    return string.Join("/", pathSegments.Skip(uploadIndex + 2));
                }

                return null;
            }
            catch (Exception ex)
            {
                return null;
            }




        }

    }




}

