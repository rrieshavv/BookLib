using BookLib.Application.DTOs.Auth;
using BookLib.Functions;
using BookLib.Infrastructure.Data;
using BookLib.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BookLib.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtSettings _jwtSettings;
        public UserService(ApplicationDbContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<CommonResponse<LoginResponse>> Login(string username, string password)
        {
            CommonResponse<LoginResponse> response = new CommonResponse<LoginResponse>();
            LoginResponse data = new LoginResponse();
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.username == username);
                if (user == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Invalid credentails";
                    return response;
                }
                if (PasswordManager.VerifyPassword(password, user.password))
                {
                    data.token = TokenManager.GenerateJwtToken(user.username, user.role, _jwtSettings);
                    data.username = user.username;
                    data.role = user.role.ToString();
                    response.Code = ResponseCode.Success;
                    response.Message = "Login successful";
                    response.Data = data;
                }
                else
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Invalid credentails";
                }
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }
    }
}
