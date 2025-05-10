using System.Threading.Tasks;
using BookLib.Application;
using BookLib.Application.DTOs.Auth;
using BookLib.Application.DTOs.User;
using BookLib.Functions;
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

        [HttpPost("reset-password/{username}")]
        public async Task<IActionResult> ResetPassword(string username)
        {
            try
            {
                var result = await _userService.ResetPasswordRequest(username);
                if (result.Code == ResponseCode.Error)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, result.Message);
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, result.Message);
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("forgot-password-verify")]
        public async Task<IActionResult> ForgotPassword([FromBody] ResetPasswordDto dto)
        {
            try
            {
                var result = await _userService.VerifyResetPassword(dto);
                if (result.Code == ResponseCode.Error)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, result.Message);
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, result.Message);
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpPut("user/profile")]
        public async Task<IActionResult> UpdateProfile([FromForm] UserUpdateDto updateDto)
        {

            var userId = ClaimsHelper.GetUserIdFromClaims(User);


            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var result = await _userService.UpdateUserProfileAsync(userId, updateDto);
            if (result.Code == Models.ResponseCode.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        [HttpPost("user/profile/image")]
        public async Task<IActionResult> UploadProfileImage(IFormFile imageFile)
        {
            var userId = ClaimsHelper.GetUserIdFromClaims(User);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (imageFile == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "No image file provided");
            }

            var result = await _userService.UploadProfileImageAsync(userId, imageFile);

            if (result.Code == Models.ResponseCode.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }



       

    }
}
