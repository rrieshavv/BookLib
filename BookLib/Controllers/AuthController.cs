using System.Threading.Tasks;
using BookLib.Application;
using BookLib.Application.DTOs.Auth;
using BookLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : Controller
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var loginResponse = await _userService.Login(loginDto.Username, loginDto.Password);
                return Ok(loginResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (registerDto == null)
                {
                    return BadRequest(new { message = "Invalid data" });
                }
                var result = await _userService.Register(registerDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Internal Server Error" });
            }
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword()
        {
            return Ok();
        }

        [HttpPost("forgot-password/{username}")]
        public IActionResult ForgotPassword(string username)
        {
            return Ok();
        }

    }
}
