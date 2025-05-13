using BookLib.Application.DTOs.Inventory;
using BookLib.Application.Interface;
using BookLib.Functions;
using BookLib.Infrastructure.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLib.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class InventoryController : Controller
    {
        private readonly IInventoryService _inventoryService;
        private readonly IHttpContextAccessor _contextAccessor;

        public InventoryController(IInventoryService inventoryService, IHttpContextAccessor contextAccessor)
        {
            _inventoryService = inventoryService;
            _contextAccessor = contextAccessor;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetInventories()
        {
            try
            {
                var response = await _inventoryService.GetInventoriesAsync();
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInventoryById(Guid id)
        {
            try
            {
                var response = await _inventoryService.GetInventoryByIdAsync(id);
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status404NotFound, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("book/{bookId}")]
        public async Task<IActionResult> GetInventoryByBookId(Guid bookId)
        {
            try
            {
                var response = await _inventoryService.GetInventoryByBookIdAsync(bookId);
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status404NotFound, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddInventory([FromBody] InventoryCreateDto inventoryDto)
        {
            try
            {
                string username = TokenManager.GetUserName(_contextAccessor);
                var response = await _inventoryService.AddInventoryAsync(inventoryDto, username);
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status201Created, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInventory(Guid id, [FromBody] InventoryUpdateDto inventoryDto)
        {
            try
            {
                string username = TokenManager.GetUserName(_contextAccessor);
                var response = await _inventoryService.EditInventoryAsync(id, inventoryDto, username);
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory(Guid id)
        {
            try
            {
                var response = await _inventoryService.DeleteInventoryAsync(id);
                if (response.Code == ResponseCode.Success)
                {
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                return StatusCode(StatusCodes.Status400BadRequest, response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
    }

}
