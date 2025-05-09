using BookLib.Functions;
using BookLib.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

       // public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItems> OrderItems { get; set; }
        public DbSet<Discount> Discounts{ get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Invoice)
                .WithOne(i => i.Order)
                .HasForeignKey<Invoice>(i => i.invoice_id);

        }

        //public void SeedAdminUser()
        //{
        //    //if (!Users.Any())
        //    //{
        //    //    Users.Add(new User
        //    //    {
        //    //        user_id = Guid.NewGuid(),
        //    //        username = "admin",
        //    //        email = "np01cp4a220267@islingtoncollege.edu.np",
        //    //        mobile = "9803633427",
        //    //        firstname = "Rishav",
        //    //        lastname = "Karna",
        //    //        role = UserRole.Admin.ToString(),
        //    //        password = PasswordManager.HashPassword("Ktmnepal@1"),
        //    //        registration_date = DateTime.UtcNow
        //    //    });
        //    //}
        //}
        public async Task SeedIdentityRolesAndAdminAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
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
                    throw new Exception("Failed to create admin user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}
