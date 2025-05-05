using BookLib.Functions;
using BookLib.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Publisher> Publishers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public void SeedAdminUser ()
        {
            if (!Users.Any())
            {
                Users.Add(new User
                {
                    user_id = Guid.NewGuid(),
                    username = "admin",
                    email = "np01cp4a220267@islingtoncollege.edu.np",
                    mobile = "9803633427",
                    firstname = "Rishav",
                    lastname = "Karna",
                    role = UserRole.admin.ToString(),
                    password = PasswordManager.HashPassword("Ktmnepal@1"),
                    registration_date = DateTime.UtcNow
                });
            }
        }
    }   
}
