using BookLib.Application.Data;
using BookLib.Application.Data.Entities;
using BookLib.Application.DTOs.Inventory;
using BookLib.Application.Interface;
using BookLib.Infrastructure.Common;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly ApplicationDbContext _context;
        public InventoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CommonResponse<InventoryDto>> AddInventoryAsync(InventoryCreateDto inventoryDto, string username)
        {
            CommonResponse<InventoryDto> response = new CommonResponse<InventoryDto>();

            try
            {
                var book = await _context.Books.FindAsync(inventoryDto.BookId);
                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Book not found";
                    return response;
                }

                decimal totalAmount = CalculateTotalAmount(inventoryDto.Quantity, inventoryDto.PricePerBook, inventoryDto.Discount);

                var inventory = new Inventory
                {
                    id = Guid.NewGuid(),
                    book_id = inventoryDto.BookId,
                    quantity = inventoryDto.Quantity,
                    company_name = inventoryDto.CompanyName,
                    company_reg_no = inventoryDto.CompanyRegNo,
                    company_address = inventoryDto.CompanyAddress,
                    price_per_book = inventoryDto.PricePerBook,
                    discount = inventoryDto.Discount,
                    total_amount = totalAmount,
                    created_at = DateTime.UtcNow
                };

                book.stock_qty += inventoryDto.Quantity;
                book.updated_date = DateTime.UtcNow;
                book.updated_by = username;

                await _context.Inventory.AddAsync(inventory);
                _context.Books.Update(book);
                await _context.SaveChangesAsync();

                var inventoryDtoResult = MapToInventoryDto(inventory);

                response.Code = ResponseCode.Success;
                response.Message = "Inventory added successfully";
                response.Data = inventoryDtoResult;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<CommonResponse<bool>> DeleteInventoryAsync(Guid inventoryId)
        {
            CommonResponse<bool> response = new CommonResponse<bool>();
            try
            {
                var inventory = await _context.Inventory
                    .Include(i => i.Book)
                    .FirstOrDefaultAsync(i => i.id == inventoryId);

                if (inventory == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Inventory record not found";
                    response.Data = false;
                    return response;
                }
                var book = inventory.Book;
                if (book != null)
                {
                    book.stock_qty = Math.Max(0, book.stock_qty - inventory.quantity);
                    book.updated_date = DateTime.UtcNow;
                    _context.Books.Update(book);
                }

                _context.Inventory.Remove(inventory);
                await _context.SaveChangesAsync();

                response.Code = ResponseCode.Success;
                response.Message = "Inventory record deleted successfully";
                response.Data = true;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                response.Data = false;
                return response;
            }
        }

        public async Task<CommonResponse<InventoryDto>> EditInventoryAsync(Guid inventoryId, InventoryUpdateDto inventoryDto, string username)
        {
            CommonResponse<InventoryDto> response = new CommonResponse<InventoryDto>();

            try
            {
                var inventory = await _context.Inventory
                    .Include(i => i.Book)
                    .FirstOrDefaultAsync(i => i.id == inventoryId);

                if (inventory == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Inventory record not found";
                    return response;
                }

                var book = inventory.Book;
                if (book == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Associated book not found";
                    return response;
                }

                int quantityDifference = inventoryDto.Quantity - inventory.quantity;
                book.stock_qty += quantityDifference;
                book.updated_date = DateTime.UtcNow;
                book.updated_by = username;

                decimal totalAmount = CalculateTotalAmount(inventoryDto.Quantity, inventoryDto.PricePerBook, inventoryDto.Discount);

                inventory.quantity = inventoryDto.Quantity;
                inventory.company_name = inventoryDto.CompanyName;
                inventory.company_reg_no = inventoryDto.CompanyRegNo;
                inventory.company_address = inventoryDto.CompanyAddress;
                inventory.price_per_book = inventoryDto.PricePerBook;
                inventory.discount = inventoryDto.Discount;
                inventory.total_amount = totalAmount;

                _context.Inventory.Update(inventory);
                _context.Books.Update(book);
                await _context.SaveChangesAsync();

                var inventoryDtoResult = MapToInventoryDto(inventory);

                response.Code = ResponseCode.Success;
                response.Message = "Inventory record updated successfully";
                response.Data = inventoryDtoResult;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<CommonResponse<InventoryDto>> GetInventoryByBookIdAsync(Guid bookId)
        {
            CommonResponse<InventoryDto> response = new CommonResponse<InventoryDto>();

            try
            {
                var inventory = await _context.Inventory
                    .Include(i => i.Book)
                    .FirstOrDefaultAsync(i => i.book_id == bookId);

                if (inventory == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Inventory record not found for this book";
                    return response;
                }

                var inventoryDto = MapToInventoryDto(inventory);

                response.Code = ResponseCode.Success;
                response.Message = "Inventory record retrieved successfully";
                response.Data = inventoryDto;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<CommonResponse<InventoryDto>> GetInventoryByIdAsync(Guid inventoryId)
        {
            CommonResponse<InventoryDto> response = new CommonResponse<InventoryDto>();

            try
            {
                var inventory = await _context.Inventory
                    .Include(i => i.Book)
                    .FirstOrDefaultAsync(i => i.id == inventoryId);

                if (inventory == null)
                {
                    response.Code = ResponseCode.Error;
                    response.Message = "Inventory record not found";
                    return response;
                }

                var inventoryDto = MapToInventoryDto(inventory);

                response.Code = ResponseCode.Success;
                response.Message = "Inventory record retrieved successfully";
                response.Data = inventoryDto;
                return response;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                return response;
            }
        }



        private InventoryDto MapToInventoryDto(Inventory inventory)
        {
            return new InventoryDto
            {
                Id = inventory.id,
                BookId = inventory.book_id,
                Quantity = inventory.quantity,
                CompanyName = inventory.company_name,
                CompanyRegNo = inventory.company_reg_no,
                CompanyAddress = inventory.company_address,
                PricePerBook = inventory.price_per_book,
                Discount = inventory.discount,
                TotalAmount = inventory.total_amount,
                CreatedAt = inventory.created_at,
                BookTitle = inventory.Book?.title
            };
        }


        private decimal CalculateTotalAmount(int quantity, decimal pricePerBook, decimal discountPercentage)
        {
            decimal subtotal = quantity * pricePerBook;
            decimal discountAmount = subtotal * (discountPercentage / 100);
            return subtotal - discountAmount;
        }

        public async Task<CommonResponse<List<InventoryDto>>> GetInventoriesAsync()
        {
            CommonResponse<List<InventoryDto>> response = new CommonResponse<List<InventoryDto>>();
            try
            {
                var inventories = await _context.Inventory
                    .Include(i => i.Book)
                    .OrderByDescending(i => i.created_at)
                    .ToListAsync();

                List<InventoryDto> inventoryDtoList = inventories.Select(MapToInventoryDto).ToList();

                response.Code = ResponseCode.Success;
                response.Message = "Inventory records retrieved successfully";
                response.Data = inventoryDtoList;
            }
            catch (Exception ex)
            {
                response.Code = ResponseCode.Exception;
                response.Message = ex.Message;
                response.Data = null;
            }
            return response;
        }
    }
}
