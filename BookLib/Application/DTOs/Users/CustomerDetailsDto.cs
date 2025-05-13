using BookLib.Application.DTOs.Auth;

namespace BookLib.Application.DTOs.Users
{
    public class CustomerDetailsDto: UserDetailsDto
    {
        public string Id { get; set; }
    }
}
