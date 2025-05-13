using BookLib.Application.Data;
using BookLib.Application.Data.Entities;
using BookLib.Application.DTOs.Order;
using BookLib.Application.Interface;
using BookLib.Functions;
using BookLib.Infrastructure.Common;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookLib.Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailService _emailService;
        public OrderService(ApplicationDbContext context, IEmailService emailService, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _context = context;
            _emailService = emailService;
        }


        public async Task<CommonResponse<OrderDetailsDto>> GetOrderDetails(string claim_code, string membershipCode)
        {
            var customer = await _userManager.Users.FirstOrDefaultAsync(x => x.MembershipCode == membershipCode);
            if (customer == null)
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "User not found"
                };
            }
            var order = await _context.Orders
                .FirstOrDefaultAsync(x => x.claim_code == claim_code);
            if (order == null)
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "Order not found"
                };
            }
            if (order.status != "Pending")
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "Order cannot be processed"
                };
            }

            var orderItems = await _context.OrderItems
                .Where(x => x.order_id == order.order_id)
                .ToListAsync();
            if (orderItems == null || orderItems.Count == 0)
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "Order items not found"
                };
            }
            var bookIds = orderItems.Select(x => x.book_id).ToList();
            var books = await _context.Books
                .Where(x => bookIds.Contains(x.book_id))
                .ToListAsync();
            if (books == null || books.Count == 0)
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "Books not found"
                };
            }
            var orderDetails = new OrderDetailsDto
            {
                OrderCode = order.order_code,
                ClaimCode = order.claim_code,
                FirstName = order.first_name,
                LastName = order.last_name,
                PhoneNumber = order.phone,
                AddressLine1 = order.address_line_1,
                AddressLine2 = order.address_line_2,
                City = order.city,
                State = order.state,
                ZipCode = order.zip_code,
                Country = order.country,
                OrderItems = new List<OrderDetailsItemDto>()
            };
            foreach (var item in orderItems)
            {
                var book = books.FirstOrDefault(x => x.book_id == item.book_id);
                if (book != null)
                {
                    orderDetails.OrderItems.Add(new OrderDetailsItemDto
                    {
                        BookId = book.book_id,
                        BookName = book.title,
                        Quantity = item.quantity,
                        Price = item.price,
                        Discount = item.discount,
                        TotalPrice = item.total_price
                    });
                }
            }
            var invoice = await _context.Invoices
                .FirstOrDefaultAsync(x => x.invoice_id == order.order_id);
            if (invoice != null)
            {
                orderDetails.InvoiceCode = invoice.invoice_no;
                orderDetails.TotalAmount = invoice.total_amount;
                orderDetails.BulkDiscount = invoice.bulk_discount;
                orderDetails.GrandTotalAmount = invoice.grand_total_amount;
            }
            return new CommonResponse<OrderDetailsDto>
            {
                Code = ResponseCode.Success,
                Message = "Order details retrieved successfully",
                Data = orderDetails
            };
        }

        public async Task<CommonResponse> CancelOrderByCustomer(Guid order_id, string password, string username)
        {

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "User not found"
                };
            }

            var isValidPassword = await _userManager.CheckPasswordAsync(user, password);

            if (!isValidPassword)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Invalid password"
                };
            }

            var order = await _context.Orders
                .FirstOrDefaultAsync(x => x.order_id == order_id && x.user_id == user.Id);

            if (order == null)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Order not found"
                };
            }

            if (order.status != "Pending")
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Order cannot be cancelled"
                };
            }

            order.status = "Cancelled";
            order.cancelled_ts = DateTime.UtcNow;
            order.cancelled_by = user.Id;
            _context.Orders.Update(order);
            var orderItems = await _context.OrderItems
                .Where(x => x.order_id == order_id)
                .ToListAsync();
            foreach (var item in orderItems)
            {
                var book = await _context.Books
                    .FirstOrDefaultAsync(x => x.book_id == item.book_id);
                if (book != null)
                {
                    book.stock_qty += item.quantity;
                    _context.Books.Update(book);
                }
            }
            // _context.OrderItems.RemoveRange(orderItems);
            await _context.SaveChangesAsync();
            return new CommonResponse
            {
                Code = ResponseCode.Success,
                Message = "Order cancelled successfully"
            };
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
                order_code = "b" + Helper.GenerateNumberWithDigits(3) + "lib" + Helper.GenerateNumberWithDigits(5),
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
                orderItem.total_price = book.price * item.Quantity - orderItem.discount * item.Quantity;
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
                invoice.grand_total_amount = totalPrice - invoice.bulk_discount;
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

        public async Task<CommonResponse> ProcessOrder(string claimCode, string membershipCode, string remarks)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(x => x.claim_code == claimCode);
            if (order == null)
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Order not found"
                };
            }
            if (order.status != "Pending")
            {
                return new CommonResponse
                {
                    Code = ResponseCode.Error,
                    Message = "Order cannot be processed"
                };
            }
            order.status = "Completed";
            order.cleared_ts = DateTime.UtcNow;
            order.remarks = remarks;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return new CommonResponse
            {
                Code = ResponseCode.Success,
                Message = "Order processed successfully"
            };
        }

        public async Task<CommonResponse<List<CustomerOrdersDto>>> GetCustomerOrders(string userId)
        {
            var user = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();
            if(user == null)
            {
                return new CommonResponse<List<CustomerOrdersDto>>
                {
                    Code = ResponseCode.Error,
                    Message = "User not found"
                };
            }

            var orders = await _context.Orders.Include(x=>x.Invoice).Where(x => x.user_id == userId).OrderByDescending(x=>x.created_ts).ToListAsync();
            List<CustomerOrdersDto> customerOrders = new List<CustomerOrdersDto>();
            foreach (var order in orders)
            {
                customerOrders.Add(new CustomerOrdersDto
                {
                    OrderId = order.order_id,
                    Status = order.status,
                    TotalAmount = order.Invoice.grand_total_amount,
                    OrderDate = order.created_ts,
                    ClaimCode = order.claim_code,
                    MembershipCode = user.MembershipCode
                });
            }
            return new CommonResponse<List<CustomerOrdersDto>>
            {
                Code = ResponseCode.Success,
                Message = "Orders retrieved successfully",
                Data = customerOrders
            };
        }

        

        public async Task<CommonResponse<OrderDetailsDto>> GetOrderDetailsByCustomer(string userId, Guid orderId, bool requestByAdmin)
        {
            var customer = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (customer == null)
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "User not found"
                };
            }

            var order = new Order();

            if (!requestByAdmin)
            {
                 order = await _context.Orders
                  .FirstOrDefaultAsync(x => x.order_id == orderId && x.user_id == userId);
            }
            else
            {
                order = await _context.Orders
                  .FirstOrDefaultAsync(x => x.order_id == orderId);
            }

            if (order == null)
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "Order not found"
                };
            }
         

            var orderItems = await _context.OrderItems
                .Where(x => x.order_id == order.order_id)
                .ToListAsync();
            if (orderItems == null || orderItems.Count == 0)
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "Order items not found"
                };
            }
            var bookIds = orderItems.Select(x => x.book_id).ToList();
            var books = await _context.Books
                .Where(x => bookIds.Contains(x.book_id))
                .ToListAsync();
            if (books == null || books.Count == 0)
            {
                return new CommonResponse<OrderDetailsDto>
                {
                    Code = ResponseCode.Error,
                    Message = "Books not found"
                };
            }
            var orderDetails = new OrderDetailsDto
            {
                OrderCode = order.order_code,
                ClaimCode = order.claim_code,
                FirstName = order.first_name,
                LastName = order.last_name,
                PhoneNumber = order.phone,
                AddressLine1 = order.address_line_1,
                AddressLine2 = order.address_line_2,
                City = order.city,
                State = order.state,
                ZipCode = order.zip_code,
                Country = order.country,
                OrderItems = new List<OrderDetailsItemDto>()
            };
            foreach (var item in orderItems)
            {
                var book = books.FirstOrDefault(x => x.book_id == item.book_id);
                if (book != null)
                {
                    orderDetails.OrderItems.Add(new OrderDetailsItemDto
                    {
                        BookId = book.book_id,
                        BookName = book.title,
                        Quantity = item.quantity,
                        Price = item.price,
                        Discount = item.discount,
                        TotalPrice = item.total_price
                    });
                }
            }
            var invoice = await _context.Invoices
                .FirstOrDefaultAsync(x => x.invoice_id == order.order_id);
            if (invoice != null)
            {
                orderDetails.InvoiceCode = invoice.invoice_no;
                orderDetails.TotalAmount = invoice.total_amount;
                orderDetails.BulkDiscount = invoice.bulk_discount;
                orderDetails.GrandTotalAmount = invoice.grand_total_amount;
            }
            return new CommonResponse<OrderDetailsDto>
            {
                Code = ResponseCode.Success,
                Message = "Order details retrieved successfully",
                Data = orderDetails
            };
        }

        public async Task<CommonResponse<List<CustomerOrdersDto>>> GetAllOrders(string status)
        {
        
            var orders = await _context.Orders
                .Include(x => x.Invoice)
                .Include(x=>x.UserDetails)
                .Where(x => x.status.ToLower() == status.ToLower())
                .OrderByDescending(x=>x.created_ts)
                .ToListAsync();
            List<CustomerOrdersDto> customerOrders = new List<CustomerOrdersDto>();
            foreach (var order in orders)
            {
                customerOrders.Add(new CustomerOrdersDto
                {
                    OrderId = order.order_id,
                    OrderCode = order.order_code,
                    Status = order.status,
                    TotalAmount = order.Invoice.grand_total_amount,
                    OrderDate = order.created_ts,
                    ClaimCode = order.claim_code,
                    MembershipCode = order.UserDetails.MembershipCode
                });
            }
            return new CommonResponse<List<CustomerOrdersDto>>
            {
                Code = ResponseCode.Success,
                Message = "Orders retrieved successfully",
                Data = customerOrders
            };
        }
    }
}
