using BookLib.Application.Data;
using BookLib.Application.Data.Entities;
using BookLib.Application.Interface;

namespace BookLib.Infrastructure.Services
{
    public class LoggerService:ILoggerService
    {
        private readonly ApplicationDbContext _context;
        public LoggerService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task AddErrorLogAsync(Exception ex, string path, string userName)
        {
            var log = new ErrorLog
            {
                Message = ex.Message,
                StackTrace = ex.StackTrace,
                Source = ex.Source,
                Path = path,
                UserName = userName,
                Timestamp = DateTime.UtcNow
            };

            _context.ErrorLogs.Add(log);
            await _context.SaveChangesAsync();
        }

        public async Task AddApiAccessLogAsync(string username, string action, HttpContext context, string? details = null)
        {
            var log = new ApiAccessLog
            {
                Username = username,
                Action = action,
                IpAddress = context.Connection.RemoteIpAddress?.ToString(),
                UserAgent = context.Request.Headers["User-Agent"].ToString(),
                Timestamp = DateTime.UtcNow,
                Details = details
            };

            _context.ApiAccessLogs.Add(log);
            await _context.SaveChangesAsync();
        }

    }
}
