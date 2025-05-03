using BookLib.Application;
using BookLib.Application.DTOs.Book;
using BookLib.Functions;
using BookLib.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]

    public class BookController : Controller
    {

        private readonly IBookService _bookService;
        private readonly IHttpContextAccessor _contextAccessor;


        public BookController(IBookService bookService, IHttpContextAccessor contextAccessor)
        {
            _bookService = bookService;
            _contextAccessor = contextAccessor;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetBooks([FromQuery] BookFilterDto filterDto)
        {
            try
            {
                var response = await _bookService.GetBooksAsync(filterDto);
                if (response.Code == ResponseCode.Success)
                {
                    return Ok(response);
                }
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });

            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetBookById(Guid id) {

            try
            {
                var response = await _bookService.GetBookByIdAsync(id);

                if (response.Code == ResponseCode.Success)
                {
                    return Ok(response);
                }
                return  NotFound(response);
            }
            catch (Exception ex) {

                return BadRequest(new { message = ex.Message });


            }

        }

        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] BookCreateDto bookDto)
        {
            try
            {
                String username = TokenManager.GetUserName(_contextAccessor);

                var response = await _bookService.AddBookAsync(bookDto, username);
                if (response.Code == ResponseCode.Success)
                {
                    return Ok(response);
                }
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });

            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(Guid id, [FromBody] BookUpdateDto bookDto)
        {
            try
            {
                String username = TokenManager.GetUserName(_contextAccessor);


                var response = await _bookService.UpdateBookAsync(id, bookDto, username);
                if (response.Code == ResponseCode.Success)
                {
                    return Ok(response);
                }
                
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });

            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            try
            {
                var response = await _bookService.DeleteBookAsync(id);

                if (response.Code == ResponseCode.Success)
                {
                    return Ok(response);
                }
                
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });

            }
        }



    }
}
