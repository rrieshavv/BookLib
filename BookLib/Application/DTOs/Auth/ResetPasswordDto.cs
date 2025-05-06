namespace BookLib.Application.DTOs.Auth
{
    public class ResetPasswordDto
    {
        public string Username { get; set; }
        public string Otp { get; set; }
        public string NewPassword { get; set; }
    }
}
