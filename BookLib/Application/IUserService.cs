using BookLib.Application.DTOs.Auth;
using BookLib.Models;

namespace BookLib.Application
{
    public interface IUserService
    {
        Task<CommonResponse<LoginResponse>> Login (string username, string password);
        Task<CommonResponse> Register(RegisterDto registerDto, UserRole role);
        Task<CommonResponse> ResetPasswordRequest(string username);
        Task<CommonResponse> VerifyResetPassword(ResetPasswordDto dto);
        Task<CommonResponse<UserDetailsDto>> GetUserDetails(string userId);
        Task<CommonResponse> ChangePassword(string userId, ChangePasswordDto dto);
    }
}
