using BookLib.Application.DTOs.Announcement;
using BookLib.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BookLib.Controllers
{
    [ApiController]
    [Route("api/v1/announcements")]
    [Authorize]
    public class AnnouncementsController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;
        private readonly ILogger<AnnouncementsController> _logger;

        public AnnouncementsController(IAnnouncementService announcementService, ILogger<AnnouncementsController> logger)
        {
            _announcementService = announcementService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<AnnouncementResponseDto>> CreateAnnouncement([FromBody] CreateAnnouncementDto createDto)
        {
            var createdBy = User.Identity?.Name ?? "System";
            var result = await _announcementService.CreateAnnouncementAsync(createDto, createdBy);
            return CreatedAtAction(nameof(GetAllAnnouncements), new { id = result.AnnouncementId }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnnouncementResponseDto>>> GetAllAnnouncements()
        {
            var announcements = await _announcementService.GetAllAnnouncementsAsync();
            return Ok(announcements);
        }

        [HttpGet("current")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AnnouncementResponseDto>>> GetCurrentAnnouncements()
        {
            _logger.LogInformation("Fetching current announcements");
            var announcements = await _announcementService.GetCurrentAnnouncementsAsync();
            _logger.LogInformation($"Found {announcements.Count()} current announcements");
            return Ok(announcements);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AnnouncementResponseDto>> UpdateAnnouncement(Guid id, [FromBody] UpdateAnnouncementDto updateDto)
        {
            var updatedBy = User.Identity?.Name ?? "System";
            updateDto.AnnouncementId = id; // Ensure the DTO has the correct ID
            var result = await _announcementService.UpdateAnnouncementAsync(updateDto, updatedBy);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAnnouncement(Guid id)
        {
            var result = await _announcementService.DeleteAnnouncementAsync(id);
            if (!result)
                return NotFound();
            
            return NoContent();
        }
    }
}