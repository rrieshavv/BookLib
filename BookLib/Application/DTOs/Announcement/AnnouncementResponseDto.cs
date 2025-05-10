namespace BookLib.Application.DTOs.Announcement
{
    public class AnnouncementResponseDto
    {
        public Guid AnnouncementId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime DisplayStartTs { get; set; }
        public DateTime DisplayEndTs { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedTs { get; set; }
        public DateTime UpdatedTs { get; set; }
        public string CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
    }
}