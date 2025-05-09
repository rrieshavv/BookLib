using System.Security.Claims;

namespace BookLib.Functions
{
    public static class ClaimsHelper
    {
        public static string GetUsernameFromClaims(ClaimsPrincipal user)
        {
            return user?.Identity?.Name;
        }

        public static string GetUserIdFromClaims(ClaimsPrincipal user)
        {
            return user?.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
        }
    }
}
