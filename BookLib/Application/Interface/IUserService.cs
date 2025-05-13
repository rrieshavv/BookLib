using BookLib.Application.DTOs.Auth;
using BookLib.Application.DTOs.User;
using BookLib.Application.DTOs.Users;
using BookLib.Infrastructure.Common;

namespace BookLib.Application.Interface
{
    public interface IUserService
    {
        Task<CommonResponse<LoginResponse>> Login (string username, string password);
        Task<CommonResponse> Register(RegisterDto registerDto, UserRole role);
        Task<CommonResponse> ResetPasswordRequest(string username);
        Task<CommonResponse> VerifyResetPassword(ResetPasswordDto dto);
        Task<CommonResponse<UserDetailsDto>> GetUserDetails(string userId);

        Task<CommonResponse> UploadProfileImageAsync(string userId, IFormFile imageFile);
        Task<CommonResponse<UserDto>> UpdateUserProfileAsync(string userId, UserUpdateDto updateDto);

        Task<CommonResponse> ChangePassword(string userId, ChangePasswordDto dto);
        Task<CommonResponse<List<CustomerDetailsDto>>> GetAllCustomers();
    }
}
