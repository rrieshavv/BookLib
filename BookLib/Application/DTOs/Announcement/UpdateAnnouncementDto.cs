using System.ComponentModel.DataAnnotations;

namespace BookLib.Application.DTOs.Announcement
{
    public class UpdateAnnouncementDto
    {
        [Required]
        public Guid AnnouncementId { get; set; }
        
        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Title { get; set; }
        
        [StringLength(500, MinimumLength = 1)]
        public string? Description { get; set; }
        
        [Required]
        public DateTime DisplayStartTs { get; set; }
        
        [Required]
        public DateTime DisplayEndTs { get; set; }
        
        [Required]
        public bool IsActive { get; set; }
    }
}