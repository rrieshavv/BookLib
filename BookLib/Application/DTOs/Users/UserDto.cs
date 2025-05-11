namespace BookLib.Application.DTOs.User
{
    public class UserDto
    {
        public string Id { get; set; }
       
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? MembershipCode { get; set; }
        public string? ProfileImage { get; set; }

    }

    public class UserUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public IFormFile? ProfileImage { get; set; }
    }
}
