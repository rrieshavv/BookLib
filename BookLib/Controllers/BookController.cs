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

        [HttpGet("all")]
        [AllowAnonymous]

        public async Task<IActionResult> GetBooks([FromQuery] BookFilterDto filterDto)
        {
            try
            {
                var response = await _bookService.GetBooksAsync(filterDto);
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpGet("search")]
        [AllowAnonymous]

        public async Task<IActionResult> SearchBooks([FromQuery] BookFilterDto filterDto)
        {
            try
            {
                var booksResponse = await _bookService.GetBooksAsync(filterDto);
                if (booksResponse.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, booksResponse);
                }
                return StatusCode(StatusCodes.Status400BadRequest, booksResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }


        [HttpGet("{id}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetBookById(Guid id)
        {
            try
            {
                var bookResponse = await _bookService.GetBookByIdAsyn(id);
                if (bookResponse.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, bookResponse);
                }
                return StatusCode(StatusCodes.Status404NotFound, bookResponse); 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }


        [HttpPost("add")]
        public async Task<IActionResult> AddBook([FromForm] BookCreateDto bookDto)
        {
            try
            {
                String username = TokenManager.GetUserName(_contextAccessor);

                var response = await _bookService.AddBookAsync(bookDto, username);
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status201Created, response);
                }

                return StatusCode(StatusCodes.Status400BadRequest);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(Guid id, [FromForm] BookUpdateDto bookDto)
        {
            try
            {
                String username = TokenManager.GetUserName(_contextAccessor);


                var response = await _bookService.UpdateBookAsync(id, bookDto, username);
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }

                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });

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
                    return StatusCode(StatusCodes.Status200OK, response);
                }

                return StatusCode(StatusCodes.Status400BadRequest);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });

            }
        }


        [HttpGet("authors")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllAuthors()
        {
            try
            {
                var response = await _bookService.GetAllAuthorsAsync();
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet("genres")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllGenres()
        {
            try
            {
                var response = await _bookService.GetAllGenresAsync();
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("publishers")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPublishers()
        {
            try
            {
                var response = await _bookService.GetAllPublishersAsync();
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("languages")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllLanguages()
        {
            try
            {
                var response = await _bookService.GetAllLanguagesAsync();
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("formats")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllFormats()
        {
            try
            {
                var response = await _bookService.GetAllFormatsAsync();
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



    }
}
