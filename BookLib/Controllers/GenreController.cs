using BookLib.Application.Interface;
using BookLib.Infrastructure.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class GenreController : ControllerBase
    {
        private readonly IBookMetaDataService _metadataService;

        public GenreController(IBookMetaDataService metadataService)
        {
            _metadataService = metadataService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGenre([FromBody] string name)
        {
            var username = User.Identity?.Name ?? "System";
            var response = await _metadataService.CreateGenreAsync(name, username);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status201Created : StatusCodes.Status400BadRequest, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGenre(Guid id, [FromBody] string name)
        {
            var username = User.Identity?.Name ?? "System";
            var response = await _metadataService.UpdateGenreAsync(id, name, username);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(Guid id)
        {
            var response = await _metadataService.DeleteGenreAsync(id);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllGenres()
        {
            var response = await _metadataService.GetAllGenresAsync();
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetGenreById(Guid id)
        {
            var response = await _metadataService.GetGenreByIdAsync(id);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status404NotFound, response);
        }
    }
}