using System.Text;
using BookLib.Application.Interface;

namespace BookLib.Middlewares
{
    public class AccessAuditMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AccessAuditMiddleware> _logger;

        public AccessAuditMiddleware(RequestDelegate next, ILogger<AccessAuditMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var request = context.Request;
            string requestBody = string.Empty;

            // only read body for applicable content types and methods
            if (request.Method == HttpMethods.Post || request.Method == HttpMethods.Put || request.Method == HttpMethods.Patch)
            {
                request.EnableBuffering(); // allows reading body multiple times
                using var reader = new StreamReader(request.Body, encoding: Encoding.UTF8, detectEncodingFromByteOrderMarks: false, leaveOpen: true);
                requestBody = await reader.ReadToEndAsync();
                request.Body.Position = 0; // reset for downstream middleware
            }

            // pipeline continued
            await _next(context);

            if (context.User.Identity?.IsAuthenticated == true)
            {
                var username = context.User.Identity.Name ?? "Unknown";
                var action = $"{request.Method} {request.Path}";
                var ip = context.Connection.RemoteIpAddress?.ToString();
                var userAgent = request.Headers["User-Agent"].ToString();

                var auditService = context.RequestServices.GetRequiredService<ILoggerService>();
                var details = $"Payload: {requestBody}";

                await auditService.AddApiAccessLogAsync(username, action, context, details);
            }
        }

    }
}
