using Microsoft.AspNetCore.Identity;

namespace BookLib.Application.Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? MembershipCode { get; set; }
        public string? ProfileImage { get; set; }
    }
}
