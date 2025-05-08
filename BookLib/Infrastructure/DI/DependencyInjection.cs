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

            services.AddSingleton(db => new EmailSettings(emailSettings.From, emailSettings.DisplayName, emailSettings.SmtpServer, emailSettings.Port, emailSettings.Username, emailSettings.Password));
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("MainDbConnection")));

            services.AddMemoryCache();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IDiscountService, DiscountService>();

            return services;
        }
    }
}
