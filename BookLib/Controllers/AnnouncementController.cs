using BookLib.Application.DTOs.Announcement;
using BookLib.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
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

        [HttpPut]
        public async Task<ActionResult<AnnouncementResponseDto>> UpdateAnnouncement([FromBody] UpdateAnnouncementDto updateDto)
        {
            var updatedBy = User.Identity?.Name ?? "System";
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

        [HttpGet("(current)")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AnnouncementResponseDto>>> GetCurrentAnnouncements()
        {
            var announcements = await _announcementService.GetCurrentAnnouncementsAsync();
            return Ok(announcements);
        }
    }
}