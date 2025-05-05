using System;
using BookLib.Application;
using BookLib.Application.Services;
using BookLib.Infrastructure.Data;
using BookLib.Models;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.DI
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("MainDbConnection")!;
            var emailSettings = configuration.GetSection("EmailSettings").Get<EmailConfig>()!;

            services.AddSingleton(db => new EmailSettings(emailSettings.From, emailSettings.SmtpServer, emailSettings.Port, emailSettings.Username, emailSettings.Password));
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("MainDbConnection")));

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IBookService, BookService>();

            return services;
        }
    }
}
