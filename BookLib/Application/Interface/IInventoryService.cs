using BookLib.Application.DTOs.Inventory;
using BookLib.Infrastructure.Common;

namespace BookLib.Application.Interface
{
    public interface IInventoryService
    {
        Task<CommonResponse<List<InventoryDto>>> GetInventoriesAsync();
        Task<CommonResponse<InventoryDto>> GetInventoryByIdAsync(Guid inventoryId);
        Task<CommonResponse<InventoryDto>> GetInventoryByBookIdAsync(Guid bookId);
        Task<CommonResponse<InventoryDto>> AddInventoryAsync(InventoryCreateDto inventoryDto, string username);
        Task<CommonResponse<InventoryDto>> EditInventoryAsync(Guid inventoryId, InventoryUpdateDto inventoryDto, string username);
        Task<CommonResponse<bool>> DeleteInventoryAsync(Guid inventoryId);
    }
}
