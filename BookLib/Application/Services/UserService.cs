using BookLib.Application.DTOs.Auth;
using BookLib.Functions;
using BookLib.Infrastructure.Data;
using BookLib.Infrastructure.Data.Entities;
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
                    data.role = user.role;
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
                response.Message = "Internal Server Error";
                return response;
            }
        }

        public async Task<CommonResponse> Register(RegisterDto registerDto)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.username == registerDto.Username );
                if (user != null)
                {
                    if(user.mobile == registerDto.Mobile)
                    {
                        return new CommonResponse
                        {
                            Code = ResponseCode.Error,
                            Message = "Mobile number already taken",
                        };
                    }

                    if (user.email == registerDto.Email)
                    {
                        return new CommonResponse
                        {
                            Code = ResponseCode.Error,
                            Message = "Email already taken",
                        };
                    }

                    return new CommonResponse
                    {
                        Code = ResponseCode.Error,
                        Message = "Username already taken",
                    };
                }

                var newUser = new User
                {
                    username = registerDto.Username,
                    firstname = registerDto.Firstname,
                    lastname = registerDto.Lastname,
                    email = registerDto.Email,
                    mobile = registerDto.Mobile,
                    password = PasswordManager.HashPassword(registerDto.Password),
                    role = UserRole.customer.ToString(),
                    registration_date = DateTime.UtcNow

                };
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
                return new CommonResponse
                {
                    Code = ResponseCode.Success,
                    Message = "User registered successfully",
                };

            }
            catch (Exception ex)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Exception,
                    Message = "Internal Server Error",
                };
            }
        }
    }
}
