using System.ComponentModel.DataAnnotations;

namespace BookLib.Application.DTOs.Auth
{
    public class LoginDto
    {
        [Required]
        public string Username {  get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class LoginResponse
    {
        public LoginResponse()
        {
            Roles = new List<string>();
        }
        public string? Token { get; set; }
        public string? User { get; set; }
        public DateTime Expiration { get; set; }
        public List<string> Roles { get; set; }
    }
}
