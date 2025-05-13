using BookLib.Application;
using BookLib.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PublisherController : ControllerBase
    {
        private readonly IBookMetaDataService _metadataService;

        public PublisherController(IBookMetaDataService metadataService)
        {
            _metadataService = metadataService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePublisher([FromBody] string name)
        {
            var username = User.Identity?.Name ?? "System";
            var response = await _metadataService.CreatePublisherAsync(name, username);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status201Created : StatusCodes.Status400BadRequest, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePublisher(Guid id, [FromBody] string name)
        {
            var username = User.Identity?.Name ?? "System";
            var response = await _metadataService.UpdatePublisherAsync(id, name, username);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublisher(Guid id)
        {
            var response = await _metadataService.DeletePublisherAsync(id);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllPublishers()
        {
            var response = await _metadataService.GetAllPublishersAsync();
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPublisherById(Guid id)
        {
            var response = await _metadataService.GetPublisherByIdAsync(id);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status404NotFound, response);
        }
    }
}