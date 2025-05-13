using BookLib.Application;
using BookLib.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly IBookMetaDataService _metadataService;

        public AuthorController(IBookMetaDataService metadataService)
        {
            _metadataService = metadataService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAuthor([FromBody] string name)
        {
            var username = User.Identity?.Name ?? "System";
            var response = await _metadataService.CreateAuthorAsync(name, username);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status201Created : StatusCodes.Status400BadRequest, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(Guid id, [FromBody] string name)
        {
            var username = User.Identity?.Name ?? "System";
            var response = await _metadataService.UpdateAuthorAsync(id, name, username);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(Guid id)
        {
            var response = await _metadataService.DeleteAuthorAsync(id);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllAuthors()
        {
            var response = await _metadataService.GetAllAuthorsAsync();
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest, response);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAuthorById(Guid id)
        {
            var response = await _metadataService.GetAuthorByIdAsync(id);
            return StatusCode(response.Code == ResponseCode.Success ? StatusCodes.Status200OK : StatusCodes.Status404NotFound, response);
        }
    }
}