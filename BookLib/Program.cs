using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using BookLib.Middlewares;
using BookLib.Application.Data;
using BookLib.Infrastructure.InfrastructureService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<AccessAuditMiddleware>();
app.UseMiddleware<ErrorHandlingMiddleware>();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate(); 
    var services = scope.ServiceProvider;
    await IdentityDataSeeder.SeedRolesAndAdminUser(services);
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();