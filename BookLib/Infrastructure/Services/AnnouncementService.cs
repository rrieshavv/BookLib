using BookLib.Application.Data;
using BookLib.Application.Data.Entities;
using BookLib.Application.DTOs.Announcement;
using BookLib.Application.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookLib.Infrastructure.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AnnouncementService> _logger;

        public AnnouncementService(ApplicationDbContext context, ILogger<AnnouncementService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<AnnouncementResponseDto> CreateAnnouncementAsync(CreateAnnouncementDto createDto, string createdBy)
        {
            var announcement = new Announcement
            {
                announcement_id = Guid.NewGuid(),
                title = createDto.Title,
                description = createDto.Description,
                display_start_ts = DateTime.SpecifyKind(createDto.DisplayStartTs, DateTimeKind.Utc),
                display_end_ts = DateTime.SpecifyKind(createDto.DisplayEndTs, DateTimeKind.Utc),
                is_active = createDto.IsActive,
                created_ts = DateTime.UtcNow,
                updated_ts = DateTime.UtcNow,
                created_by = createdBy,
            };
            
            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();
            
            return MapToResponseDto(announcement);
        }

        public async Task<IEnumerable<AnnouncementResponseDto>> GetAllAnnouncementsAsync()
        {
            var announcements = await _context.Announcements.ToListAsync();
            return announcements.Select(MapToResponseDto);
        }

        public async Task<AnnouncementResponseDto> UpdateAnnouncementAsync(UpdateAnnouncementDto updateDto, string updatedBy)
        {
            var announcement = await _context.Announcements.FindAsync(updateDto.AnnouncementId);
            if (announcement == null)
                throw new KeyNotFoundException($"Announcement with ID {updateDto.AnnouncementId} not found.");
    
            announcement.title = updateDto.Title;
            announcement.description = updateDto.Description;
            announcement.display_start_ts = DateTime.SpecifyKind(updateDto.DisplayStartTs, DateTimeKind.Utc);
            announcement.display_end_ts = DateTime.SpecifyKind(updateDto.DisplayEndTs, DateTimeKind.Utc);
            announcement.is_active = updateDto.IsActive;
            announcement.updated_ts = DateTime.UtcNow;
            announcement.updated_by = updatedBy;

            await _context.SaveChangesAsync();

            return MapToResponseDto(announcement);
        }

        public async Task<bool> DeleteAnnouncementAsync(Guid announcementId)
        {
            var announcement = await _context.Announcements.FindAsync(announcementId);
            if (announcement == null)
                return false;
            
            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<AnnouncementResponseDto>> GetCurrentAnnouncementsAsync()
        {
            var currentTime = DateTime.UtcNow;
            _logger.LogInformation($"Getting current announcements at {currentTime}");

            // First, get all announcements to debug
            var allAnnouncements = await _context.Announcements.ToListAsync();
            _logger.LogInformation($"Total announcements in database: {allAnnouncements.Count}");
            
            foreach (var announcement in allAnnouncements)
            {
                _logger.LogInformation($"Announcement: {announcement.title}, Active: {announcement.is_active}, " +
                    $"Start: {announcement.display_start_ts}, End: {announcement.display_end_ts}, " +
                    $"Current Time: {currentTime}");
            }

            var announcements = await _context.Announcements
                .Where(a => a.is_active &&
                            a.display_start_ts <= currentTime &&
                            (a.display_end_ts >= currentTime || a.display_end_ts == a.display_start_ts))
                .ToListAsync();

            _logger.LogInformation($"Found {announcements.Count} current announcements");
            return announcements.Select(MapToResponseDto);
        }

        private static AnnouncementResponseDto MapToResponseDto(Announcement announcement)
        {
            return new AnnouncementResponseDto
            {
                AnnouncementId = announcement.announcement_id,
                Title = announcement.title,
                Description = announcement.description,
                DisplayStartTs = announcement.display_start_ts,
                DisplayEndTs = announcement.display_end_ts,
                IsActive = announcement.is_active,
                CreatedTs = announcement.created_ts,
                UpdatedTs = announcement.updated_ts,
                CreatedBy = announcement.created_by,
                UpdatedBy = announcement.updated_by,
            };
        }
    }
}