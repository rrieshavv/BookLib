using BookLib.Application.DTOs.Order;
using BookLib.Functions;
using BookLib.Infrastructure.Data;
using BookLib.Infrastructure.Data.Entities;
using BookLib.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BookLib.Application.Services
{
    public class OrderService : IOrderService
    {
        public readonly ApplicationDbContext _context;
        public readonly IEmailService _emailService;
        public OrderService(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<CommonResponse<OrderResponse>> CreateOrder(OrderDto dto, string userId)
        {
            if (dto.OrderItems.Count == 0)
            {
                return new CommonResponse<OrderResponse>
                {
                    Code = ResponseCode.Error,
                    Message = "Order items cannot be empty"
                };
            }

            int totalBooks = dto.OrderItems.Sum(x => x.Quantity);

            if (totalBooks < 1)
            {
                return new CommonResponse<OrderResponse>
                {
                    Code = ResponseCode.Error,
                    Message = "Order items cannot be less than 1"
                };
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                return new CommonResponse<OrderResponse>
                {
                    Code = ResponseCode.Error,
                    Message = "User not found"
                };
            }

            Order order = new Order
            {
                order_id = Guid.NewGuid(),
                order_code = ("b" + Helper.GenerateNumberWithDigits(3) + "lib" + Helper.GenerateNumberWithDigits(5)),
                created_ts = DateTime.UtcNow,
                user_id = user.Id,
                status = "Pending",
                first_name = dto.FirstName,
                last_name = dto.LastName,
                phone = dto.PhoneNumber,
                address_line_1 = dto.AddrLine1,
                address_line_2 = dto.AddrLine2,
                city = dto.City,
                state = dto.State,
                zip_code = dto.Zip,
                country = dto.Country,
                claim_code = Helper.GenerateAlphanumericString(8)
            };

            _context.Orders.Add(order);

            decimal totalPrice = 0;

            List<OrderItems> orderItems = new List<OrderItems>();

            foreach (var item in dto.OrderItems)
            {
                var book = await _context.Books.FirstOrDefaultAsync(x => x.book_id == item.BookId);

                if (book == null)
                {
                    return new CommonResponse<OrderResponse>
                    {
                        Code = ResponseCode.Error,
                        Message = "Invalid book placed for order"
                    };
                }

                if (book.stock_qty < item.Quantity)
                {
                    return new CommonResponse<OrderResponse>
                    {
                        Code = ResponseCode.Error,
                        Message = "Book stock is not sufficient"
                    };
                }

                book.stock_qty -= item.Quantity;
                _context.Books.Update(book);

                var discount = await _context.Discounts
                    .Where(x => x.book_id == book.book_id && x.start_date <= DateTime.UtcNow && x.end_date >= DateTime.UtcNow)
                    .FirstOrDefaultAsync();


                var orderItem = new OrderItems();

                if (discount != null)
                {
                    orderItem.discount_title = discount.title;
                    orderItem.discount_percentage = discount.discount_percentage;
                    orderItem.discount = book.price * discount.discount_percentage / 100;
                }

                orderItem.order_id = order.order_id;
                orderItem.book_id = item.BookId;
                orderItem.quantity = item.Quantity;
                orderItem.price = book.price;
                orderItem.total_price = (book.price * item.Quantity) - (orderItem.discount * item.Quantity);
                totalPrice += orderItem.total_price;
                _context.OrderItems.Add(orderItem);
            


                orderItems.Add(orderItem);
            }


            Invoice invoice = new Invoice
            {
                invoice_id = order.order_id,
                invoice_no = "INV-" + Helper.GenerateNumberWithDigits(6),
                status = "Unpaid",
                issued_ts = DateTime.UtcNow,
                total_amount = totalPrice,
            };

            // if there are more than 5 books, apply 5% bulk discount
            if (totalBooks > 5)
            {
                invoice.bulk_discount = totalPrice * 5 / 100;
                invoice.bulk_discount_percentage = 5;
                invoice.grand_total_amount = totalPrice - (totalPrice * invoice.bulk_discount / 100);
                invoice.remarks = "5% discount applied.";
            }
            else
            {
                invoice.bulk_discount = 0;
                invoice.bulk_discount_percentage = 0;
                invoice.grand_total_amount = totalPrice;
            }

            _context.Invoices.Add(invoice);

            await _context.SaveChangesAsync();

            if (!string.IsNullOrWhiteSpace(user.Email))
            {
                await _emailService.SendEmail(new EmailMessage(
                               new List<string> { user.Email },
                         $"BookLib - Invoice - {invoice.invoice_no}",
                               EmailTemplates.InvoiceEmail(invoice, orderItems, order, user)
                           ));

            }


            return new CommonResponse<OrderResponse>
            {
                Code = ResponseCode.Success,
                Message = "Order created successfully",
                Data = new OrderResponse
                {

                    OrderCode = order.order_code,
                    InvoiceCode = invoice.invoice_no
                }
            };
        }
    }
}
