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
        public string username { get; set;}
        public string token { get; set;}
        public string role { get; set;}
    }
}
