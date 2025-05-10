namespace BookLib.Application.DTOs.Auth
{
    public class UserDetailsDto
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ProfileImage { get; set; }
        public string MembershipCode { get; set; }
    }
}
