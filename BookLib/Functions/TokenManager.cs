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
