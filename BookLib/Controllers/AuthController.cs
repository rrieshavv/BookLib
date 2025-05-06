using System.Threading.Tasks;
using BookLib.Application;
using BookLib.Application.DTOs.Auth;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using Microsoft.AspNetCore.Authorization;
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
                if (loginResponse.Code == ResponseCode.Error)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, loginResponse.Message);
                }
                return StatusCode(StatusCodes.Status200OK, loginResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpPost("register-customer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] RegisterDto registerDto)
        {
            try
            {
                var result = await _userService.Register(registerDto, UserRole.customer);
                if (result.Code == ResponseCode.Error)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, result.Message);
                }
                return StatusCode(StatusCodes.Status201Created, result.Message);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [Authorize(Roles = nameof(UserRole.admin))]
        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto registerDto)
        {
            try
            {
                var result = await _userService.Register(registerDto, UserRole.admin);
                if (result.Code == ResponseCode.Error)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, result.Message);
                }
                return StatusCode(StatusCodes.Status201Created, result.Message);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(Roles = nameof(UserRole.admin))]
        [HttpPost("register-staff")]
        public async Task<IActionResult> RegisterStaff([FromBody] RegisterDto registerDto)
        {
            try
            {
                var result = await _userService.Register(registerDto, UserRole.staff);
                if (result.Code == ResponseCode.Error)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, result.Message);
                }
                return StatusCode(StatusCodes.Status201Created, result.Message);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
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
