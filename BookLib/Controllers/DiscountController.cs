using BookLib.Application;
using BookLib.Application.DTOs.Book;
using BookLib.Application.Services;
using BookLib.Functions;
using BookLib.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DiscountController:Controller
    {

        private readonly IDiscountService _discountService;
        private readonly IHttpContextAccessor _contextAccessor;


        public DiscountController(IDiscountService discountService, IHttpContextAccessor contextAccessor)
        {
            _discountService = discountService;
            _contextAccessor = contextAccessor;
        }


        [HttpPost("book/addDiscount")]

        public async Task<IActionResult> AddDiscount([FromBody] DiscountCreateDto discountDto)
        {
            try
            {
                var username = TokenManager.GetUserName(_contextAccessor);

                var response = await _discountService.AddDiscountAsync(discountDto, username);

                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status201Created, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpPut("book/editDiscount/{discountId}")]
        public async Task<IActionResult> EditDiscount(Guid discountId, [FromBody] DiscountUpdateDto discountDto)
        {
            try
            {
                var username = TokenManager.GetUserName(_contextAccessor);

                var response = await _discountService.EditDiscountAsync(discountId, discountDto, username);

                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }



        [HttpDelete("book/deleteDiscount/{discountId}")]
        public async Task<IActionResult> DeleteDiscount(Guid discountId)
        {
            try
            {
                var response = await _discountService.DeleteDiscountAsync(discountId);

                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status404NotFound, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("book/getDiscounts")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDiscounts([FromQuery] DiscountFilterDto filterDto)
        {
            try
            {
                var response = await _discountService.GetDiscountsAsync(filterDto);

                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("book/getDiscountById/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDiscountById(Guid id)
        {
            try
            {
                var response = await _discountService.GetDiscountByIdAsync(id);

                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("book/discount/getDiscountById/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDiscountByDiscountId(Guid id)
        {
            try
            {
                var response = await _discountService.GetDiscountByDiscountIdAsync(id);

                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }


    }
}
