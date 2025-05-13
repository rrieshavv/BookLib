using BookLib.Application.DTOs.Book;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IDiscountService
    {

        Task<CommonResponse<DiscountDto>> AddDiscountAsync(DiscountCreateDto discountDto, string username);
        Task<CommonResponse<DiscountDto>> EditDiscountAsync(Guid discountId, DiscountUpdateDto discountDto, string username);
        Task<CommonResponse<bool>> DeleteDiscountAsync(Guid discountId);
        Task<CommonResponse<PaginatedDiscountResponseDto>> GetDiscountsAsync(DiscountFilterDto filterDto);

        Task<CommonResponse<DiscountDto>> GetDiscountByIdAsync(Guid id);
        Task<CommonResponse<DiscountDto>> GetDiscountByDiscountIdAsync(Guid id);




    }
}
