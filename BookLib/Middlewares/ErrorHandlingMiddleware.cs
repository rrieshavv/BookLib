using BookLib.Application;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            var path = context.Request.Path.ToString();
            var userName = context.User.Identity?.Name ?? "";

            // Resolve scoped service here
            var loggerService = context.RequestServices.GetRequiredService<ILoggerService>();
            await loggerService.AddErrorLogAsync(ex, path, userName);

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new { message = "An error occurred while processing your request." });
        }
    }
}
