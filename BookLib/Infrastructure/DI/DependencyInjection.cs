using System;
using System.Text;
using BookLib.Application;
using BookLib.Application.Services;
using BookLib.Infrastructure.Configurations;
using BookLib.Infrastructure.Data;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using MailKit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
            services.AddScoped<ILoggerService, LoggerService>();
            services.AddScoped<IDiscountService, DiscountService>();
            services.AddScoped<IAnnouncementService, AnnouncementService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IInventoryService, InventoryService>();
            services.AddScoped<IBookMetaDataService, BookMetaDataService>();
            services.AddScoped<IDashboardService, DashboardService>();



            // add config for the identity setup
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // add config for the reset password (for token lifespan)
            services.Configure<DataProtectionTokenProviderOptions>(
                opts => opts.TokenLifespan = TimeSpan.FromHours(10));

            // add config for the authentication with JWT bearer tokens
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:ValidAudience"],
                    ValidIssuer = configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]!))
                };
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", policy =>
                {
                    policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            services.AddHttpContextAccessor();
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));

            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));

            return services;
        }
    }
}
