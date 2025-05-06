using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookLib.Application.DTOs.Auth;
using BookLib.Functions;
using BookLib.Infrastructure.Data;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using static System.Net.WebRequestMethods;

namespace BookLib.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly IMemoryCache _cache;


        public UserService(ApplicationDbContext context, IOptions<JwtSettings> jwtSettings, UserManager<ApplicationUser> userManager, IConfiguration configuration, IEmailService emailService, IMemoryCache cache)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
            _userManager = userManager;
            _configuration = configuration;
            _emailService = emailService;
            _cache = cache;
        }

        public async Task<CommonResponse<LoginResponse>> Login(string username, string password)
        {
            CommonResponse<LoginResponse> response = new CommonResponse<LoginResponse>();
            var user = await _userManager.FindByNameAsync(username);


            if (user != null && await _userManager.CheckPasswordAsync(user, password))
            {
                var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName!),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                // add roles to the list
                var userRoles = await _userManager.GetRolesAsync(user);

                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }

                // generate the token with the claims
                var jwtToken = GetToken(authClaims);

                response.Code = ResponseCode.Success;
                response.Message = "Login successful";
                response.Data = new LoginResponse
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    Expiration = jwtToken.ValidTo,
                    User = user.UserName,
                    Roles = userRoles.ToList()
                };
                return response;
            }
            else
            {
                response.Code = ResponseCode.Error;
                response.Message = "Invalid credentials";
                return response;
            }

        }


        public async Task<CommonResponse> Register(RegisterDto registerDto, UserRole role)
        {
            var user = await _userManager.FindByNameAsync(registerDto.Username);
            if (user != null)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Username already taken",
                };
            }

            user = await _userManager.FindByEmailAsync(registerDto.Email);
            if (user != null)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Email already taken",
                };
            }

            var applicationUser = new ApplicationUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                PhoneNumber = registerDto.Mobile,
                FirstName = registerDto.Firstname,
                LastName = registerDto.Lastname,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(applicationUser, registerDto.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(applicationUser, role.ToString());
                return new CommonResponse
                {
                    Code = ResponseCode.Success,
                    Message = "User registered successfully",
                };
            }
            else
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Registration failed",
                };
            }

        }

        public async Task<CommonResponse> ResetPasswordRequest(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "User not found",
                };
            }
            // Injected IMemoryCache _cache

            string otp = new Random().Next(100000, 999999).ToString();
            _cache.Set($"ResetPasswordOtp:{user.Id}", otp, TimeSpan.FromMinutes(10));


            await _emailService.SendEmail(new EmailMessage(
                   new List<string> { user.Email },
             "Password Reset OTP",
                   EmailTemplates.ResetPasswordTokenEmail(otp, user.UserName)
               ));

            return new CommonResponse
            {
                Code = ResponseCode.Success,
                Message = "Password reset token sent to email",
            };
        }

        public async Task<CommonResponse> VerifyResetPassword(ResetPasswordDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Username);
            if (user == null)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "User not found"
                };
            }

            if (!_cache.TryGetValue($"ResetPasswordOtp:{user.Id}", out string cachedOtp) || cachedOtp != dto.Otp)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Invalid or expired OTP"
                };
            }

            // OTP is valid – generate Identity reset token
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, dto.NewPassword);

            if (!result.Succeeded)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Password reset failed"
                };
            }

            // Remove OTP after success
            _cache.Remove($"ResetPasswordOtp:{user.Id}");

            return new CommonResponse
            {
                Code = ResponseCode.Success,
                Message = "Password reset successful"
            };
        }

        /// <summary>
        /// Generates the JWT authenticated token with the list of claims.
        /// </summary>
        /// <param name="authClaims"></param>
        /// <returns>The token object.</returns>
        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(2),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
