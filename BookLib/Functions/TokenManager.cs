using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookLib.Functions
{
    public static class TokenManager
    {
        public static string GetUserName(IHttpContextAccessor httpContextAccessor)
        {
            var username = httpContextAccessor.HttpContext?.User.Identity?.Name;
            return username ?? string.Empty;
        }
    }
}
