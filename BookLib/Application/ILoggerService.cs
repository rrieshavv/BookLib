namespace BookLib.Application
{
    public interface ILoggerService
    {
        Task AddErrorLogAsync(Exception ex, string path, string userName);
        Task AddApiAccessLogAsync(string username, string action, HttpContext context, string? details = null);
    }
}
