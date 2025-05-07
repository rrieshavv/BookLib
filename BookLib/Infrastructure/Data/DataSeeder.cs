using BookLib.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace BookLib.Infrastructure.Data
{
    public static class IdentityDataSeeder
    {
        public static async Task SeedRolesAndAdminUser(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            string[] roles = { "admin", "staff", "customer" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            var adminEmail = "np01cp4a220267@islingtoncollege.edu.np";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "admin",
                    Email = adminEmail,
                    EmailConfirmed = true,
                    PhoneNumber = "9803633427"
                };

                var result = await userManager.CreateAsync(user, "Ktmnepal@1");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "admin");
                }
                else
                {
                    throw new Exception("Failed to create admin user: " + string.Join("; ", result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}