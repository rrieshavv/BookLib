using BookLib.Application.DTOs.Auth;
using BookLib.Application.DTOs.User;
using BookLib.Application.Interface;
using BookLib.Functions;
using BookLib.Infrastructure.Common;
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
            var loginResponse = await _userService.Login(loginDto.Username, loginDto.Password);
            if (loginResponse.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, loginResponse.Message);
            }
            return StatusCode(StatusCodes.Status200OK, loginResponse);
        }


        [HttpPost("register-customer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] RegisterDto registerDto)
        {
            var result = await _userService.Register(registerDto, UserRole.customer);
            if (result.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, result.Message);
            }
            return StatusCode(StatusCodes.Status201Created, result.Message);
        }


        [Authorize(Roles = nameof(UserRole.admin))]
        [HttpPost("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterDto registerDto)
        {
            var result = await _userService.Register(registerDto, UserRole.admin);
            if (result.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, result.Message);
            }
            return StatusCode(StatusCodes.Status201Created, result.Message);
        }

        [Authorize(Roles = nameof(UserRole.admin))]
        [HttpPost("register-staff")]
        public async Task<IActionResult> RegisterStaff([FromBody] RegisterDto registerDto)
        {
            var result = await _userService.Register(registerDto, UserRole.staff);
            if (result.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, result.Message);
            }
            return StatusCode(StatusCodes.Status201Created, result.Message);
        }

        [HttpPost("reset-password/{username}")]
        public async Task<IActionResult> ResetPassword(string username)
        {
            var result = await _userService.ResetPasswordRequest(username);
            if (result.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, result.Message);
            }

            return StatusCode(StatusCodes.Status200OK, result.Message);
        }

        [HttpPost("forgot-password-verify")]
        public async Task<IActionResult> ForgotPassword([FromBody] ResetPasswordDto dto)
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

        [HttpGet("Get-User-Details")]
        [Authorize]
        public async Task<IActionResult> GetUserDetails()
        {
            var result = await _userService.GetUserDetails(ClaimsHelper.GetUserIdFromClaims(User));
            if (result.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, result.Message);
            }
            return StatusCode(StatusCodes.Status200OK, result.Data);
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
            if (result.Code == ResponseCode.Success)
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

            if (result.Code == ResponseCode.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);

        }

        [HttpPost("change-Password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userId = ClaimsHelper.GetUserIdFromClaims(User);
            var result = await _userService.ChangePassword(userId, dto);
            if (result.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, result.Message);
            }
            return StatusCode(StatusCodes.Status200OK, result.Message);
        }

        [HttpGet("Get-all-customers")]
        [Authorize(Roles = nameof(UserRole.admin))]
        public async Task<IActionResult> GetAllCustomers()
        {
            var result = await _userService.GetAllCustomers();
            if (result.Code == ResponseCode.Error)
            {
                return StatusCode(StatusCodes.Status400BadRequest, result.Message);
            }
            return StatusCode(StatusCodes.Status200OK, result.Data);
        }
    }
}
