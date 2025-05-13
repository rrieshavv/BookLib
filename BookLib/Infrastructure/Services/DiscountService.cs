using BookLib.Application.Data;
using BookLib.Application.Data.Entities;
using BookLib.Application.DTOs.Book;
using BookLib.Application.Interface;
using BookLib.Infrastructure.Common;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BookLib.Infrastructure.Services
{
    public class DiscountService:IDiscountService
    {

        private readonly ApplicationDbContext _context;

        public DiscountService(ApplicationDbContext context) {                
            _context = context;
        }

        public async Task<CommonResponse<DiscountDto>> AddDiscountAsync(DiscountCreateDto discountDto, string username)
        {
            CommonResponse<DiscountDto> response = new CommonResponse<DiscountDto>();


            try
            {
                var book = await _context.Books.FindAsync(discountDto.BookId);
                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Book not found";
                    return response;
                }

                var existingDiscount = await _context.Discounts
                    .Where(d => d.book_id == discountDto.BookId &&
                           d.start_date <= discountDto.EndDate && d.end_date >= discountDto.StartDate)
                    .FirstOrDefaultAsync();

                if (existingDiscount != null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "There is already a discount for this book during the specified period";
                    return response;
                }

                var discount = new Discount
                {
                    discount_id = Guid.NewGuid(),
                    book_id = discountDto.BookId,
                    title = discountDto.Title,
                    discount_percentage = discountDto.DiscountPercentage,
                    start_date = DateTime.SpecifyKind(discountDto.StartDate, DateTimeKind.Utc),
                    end_date = DateTime.SpecifyKind(discountDto.EndDate, DateTimeKind.Utc)
                };

                await _context.Discounts.AddAsync(discount);
                await _context.SaveChangesAsync();

                var discountDtoResult = MapToDiscountDto(discount);

                response.Code = ResponseCode.Success;
                response.Message = "Discount added successfully";
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

        public async Task<CommonResponse<bool>> DeleteDiscountAsync(Guid discountId)
        {
            CommonResponse<bool> response = new CommonResponse<bool>();
            try
            {
                var discount = await _context.Discounts.FindAsync(discountId);
                if (discount == null) {

                    response.Code = ResponseCode.Error;
                    response.Message = "Discount not found";
                    response.Data = false;
                    return response;
                }

                _context.Discounts.Remove(discount);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Discount deleted successfully";
                response.Data = true;
                return response;
            }
            catch (Exception ex) {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                response.Data = false;
                return response;
            }

        }

        public async Task<CommonResponse<DiscountDto>> EditDiscountAsync(Guid discountId, DiscountUpdateDto discountDto, string username)
        {
            CommonResponse<DiscountDto> response = new CommonResponse<DiscountDto>();

            try
            {

                var discount = await _context.Discounts
                     .Include(d => d.BookDetails)
                     .FirstOrDefaultAsync(d => d.discount_id == discountId);


                if (discount == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Discount not found";
                    return response;
                }

                var existingDiscount = await _context.Discounts
                   .Where(d => d.book_id == discount.book_id &&
                          d.discount_id != discountId &&

                          

                          d.start_date <= discountDto.EndDate &&
                          d.end_date >= discountDto.StartDate

                          )

                   .FirstOrDefaultAsync();


                if (existingDiscount != null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "There is already another discount for this book during the specified period";
                    return response;
                }

                discount.title = discountDto.Title;
                discount.discount_percentage = discountDto.DiscountPercentage;
                discount.start_date = DateTime.SpecifyKind(discountDto.StartDate, DateTimeKind.Utc);
                discount.end_date = DateTime.SpecifyKind(discountDto.EndDate, DateTimeKind.Utc);

                _context.Discounts.Update(discount);
                await _context.SaveChangesAsync();

                var discountDtoResult = MapToDiscountDto(discount);

                response.Code = ResponseCode.Success;
                response.Message = "Discount updated successfully";
                response.Data = null;
                return response;
            }

            catch (Exception ex) {

                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;


            }
        }


        public async Task<CommonResponse<PaginatedDiscountResponseDto>> GetDiscountsAsync(DiscountFilterDto filterDto)
        {
            CommonResponse<PaginatedDiscountResponseDto> response = new CommonResponse<PaginatedDiscountResponseDto>();
            try
            {
                IQueryable<Discount> query = _context.Discounts
                    .Include(d => d.BookDetails);

                if (filterDto.BookId.HasValue)
                {
                    query = query.Where(d => d.book_id == filterDto.BookId.Value);
                }

                if (filterDto.FromDate.HasValue)
                {
                    DateTime utcFromDate = DateTime.SpecifyKind(filterDto.FromDate.Value, DateTimeKind.Utc);
                    query = query.Where(d => d.start_date >= utcFromDate || d.end_date >= utcFromDate);
                }

                if (filterDto.ToDate.HasValue)
                {
                    DateTime utcToDate = DateTime.SpecifyKind(filterDto.ToDate.Value, DateTimeKind.Utc);
                    query = query.Where(d => d.start_date <= utcToDate || d.end_date <= utcToDate);
                }

                if (!string.IsNullOrEmpty(filterDto.Title))
                {
                    query = query.Where(d => d.title.Contains(filterDto.Title));
                }

                if (filterDto.MinDiscountPercentage.HasValue)
                {
                    query = query.Where(d => d.discount_percentage >= filterDto.MinDiscountPercentage.Value);
                }

                if (filterDto.MaxDiscountPercentage.HasValue)
                {
                    query = query.Where(d => d.discount_percentage <= filterDto.MaxDiscountPercentage.Value);
                }

                if (filterDto.IsActive.HasValue)
                {
                    DateTime now = DateTime.UtcNow;
                    if (filterDto.IsActive.Value)
                    {
                        query = query.Where(d => d.start_date <= now && d.end_date >= now);
                    }
                    else
                    {
                        query = query.Where(d => d.start_date > now || d.end_date < now);
                    }
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
                    perPageCount = totalCount - (totalPages - 1) * filterDto.PageSize;
                    if (perPageCount < 0) perPageCount = 0;
                }

                var pagedDiscounts = await query
                    .Skip((filterDto.PageNumber - 1) * filterDto.PageSize)
                    .Take(filterDto.PageSize)
                    .ToListAsync();

                List<DiscountDto> discountDtoList = pagedDiscounts.Select(MapToDiscountDto).ToList();

                var paginatedResponse = new PaginatedDiscountResponseDto
                {
                    Discounts = discountDtoList,
                    TotalCount = totalCount,
                    PageNumber = filterDto.PageNumber,
                    PageSize = filterDto.PageSize,
                    TotalPages = totalPages,
                    PerPageCount = perPageCount
                };

                response.Code = ResponseCode.Success;
                response.Message = "Discounts retrieved successfully";
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


        private DiscountDto MapToDiscountDto(Discount discount) {


            return new DiscountDto
            {
                DiscountId = discount.discount_id,
                BookId = discount.book_id,
                Title = discount.title,
                DiscountPercentage = discount.discount_percentage,
                StartDate = discount.start_date,
                EndDate = discount.end_date,
                BookTitle = discount.BookDetails?.title
            };


        }

        private IQueryable<Discount> ApplySorting(IQueryable<Discount> query, string sortBy, bool sortAscending)
        {
            switch (sortBy?.ToLower())
            {
                case "title":
                    return sortAscending ? query.OrderBy(d => d.title) : query.OrderByDescending(d => d.title);

                case "discount_percentage":
                    return sortAscending ? query.OrderBy(d => d.discount_percentage) : query.OrderByDescending(d => d.discount_percentage);

                case "start_date":
                    return sortAscending ? query.OrderBy(d => d.start_date) : query.OrderByDescending(d => d.start_date);

                case "end_date":
                    return sortAscending ? query.OrderBy(d => d.end_date) : query.OrderByDescending(d => d.end_date);

                case "book_title":
                    return sortAscending ? query.OrderBy(d => d.BookDetails.title) : query.OrderByDescending(d => d.BookDetails.title);

                default:
                    return sortAscending ? query.OrderBy(d => d.start_date) : query.OrderByDescending(d => d.start_date);
            }
        }

        public async Task<CommonResponse<DiscountDto>> GetDiscountByIdAsync(Guid id)
        {
            CommonResponse<DiscountDto> response = new CommonResponse<DiscountDto>();

            try
            {
                var book = await _context.Discounts
                    .FirstOrDefaultAsync(b => b.book_id == id);

                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Discount not found";
                    return response;
                }

                var bookDto = MapToDiscountDto(book);

                response.Code = ResponseCode.Success;
                response.Message = "Discount retrieved successfully";
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

        public async Task<CommonResponse<DiscountDto>> GetDiscountByDiscountIdAsync(Guid id)
        {
            CommonResponse<DiscountDto> response = new CommonResponse<DiscountDto>();
            try
            {
                var discount = await _context.Discounts
                    .FirstOrDefaultAsync(d => d.discount_id == id);

                if (discount == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Discount not found";
                    return response;
                }

                var discountDto = MapToDiscountDto(discount);

                response.Code = ResponseCode.Success;
                response.Message = "Discount retrieved successfully";
                response.Data = discountDto;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }
    }
}
