using BookLib.Application.DTOs.Announcement;

namespace BookLib.Application
{
    public interface IAnnouncementService
    {
        Task<AnnouncementResponseDto> CreateAnnouncementAsync(CreateAnnouncementDto createDto, string createdBy);
        Task<IEnumerable<AnnouncementResponseDto>> GetAllAnnouncementsAsync();
        Task<AnnouncementResponseDto> UpdateAnnouncementAsync(UpdateAnnouncementDto updateDto, string updatedBy);
        Task<bool> DeleteAnnouncementAsync(Guid announcementId);
        Task<IEnumerable<AnnouncementResponseDto>> GetCurrentAnnouncementsAsync();
    }
}