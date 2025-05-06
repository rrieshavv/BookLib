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
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BookLib.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;


        public UserService(ApplicationDbContext context, IOptions<JwtSettings> jwtSettings, UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<CommonResponse<LoginResponse>> Login(string username, string password)
        {
            try
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
                        Roles =userRoles.ToList()
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
            catch
            {
                return new CommonResponse<LoginResponse>
                {
                    Code = ResponseCode.Exception,
                    Message = "Internal Server Error",
                };
            }
        }

        public async Task<CommonResponse> Register(RegisterDto registerDto)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.username == registerDto.Username);
                if (user != null)
                {
                    if (user.mobile == registerDto.Mobile)
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
