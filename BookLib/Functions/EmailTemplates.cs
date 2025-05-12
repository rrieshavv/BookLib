using BookLib.Application.DTOs.Order;
using BookLib.Infrastructure.Data.Entities;

namespace BookLib.Functions
{
    public static class EmailTemplates
    {
        public static string ResetPasswordTokenEmail(string token, string username)
        {
            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }}
                .container {{
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }}
                .token {{
                    font-weight: bold;
                    color: #2c3e50;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>Hello {username},</h2>
                <p>You requested to reset your password.</p>
                <p>Use the following token to reset your password:</p>
                <p class='token'>{token}</p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <br/>
                <p>Thanks,<br/>Your Support Team</p>
            </div>
        </body>
        </html>";
        }


        public static string InvoiceEmail(Invoice invoice, List<OrderItems> orderItems, Order order, ApplicationUser user)
        {
            string html = $@"

<!DOCTYPE html>
<html lang=""en"">
<head>
  <meta charset=""UTF-8"" />
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
  <meta name=""color-scheme"" content=""light dark"" />
  <title>BookLib Invoice</title>
</head>
<body style=""background-color: #f4f1ea; font-family: sans-serif; padding: 2.5rem 1rem; margin: 0;"">
  <div style=""max-width: 900px; margin: 0 auto; padding: 1.5rem; background-color: #ffffff; border-radius: 1rem; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);"">

    <!-- Header (Responsive Table Layout with Correct Alignment) -->
    <table role=""presentation"" width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""table-layout: fixed; padding: 1.5rem; background-color: #ecfdf5;color:black; border-bottom: 1px solid #e5e7eb;"">
      <tr>
        <!-- Left: BookLib Info -->
        <td valign=""top"" style=""width: 50%; padding-right: 1rem;"">
          <h2 style=""font-size: 1.5rem; font-weight: bold; color: #065f46; margin: 0;"">BookLib</h2>
          <p style=""color: #4b5563; margin: 0.25rem 0;"">Your Gateway to Literary Adventures</p>
          <p style=""color: #4b5563; margin-top: 0.5rem;"">
            Kamal Pokhari, Kathmandu<br />
            Nepal<br />
            Email: <a href=""mailto:info@booklibbooks.com"" style=""color: #065f46; text-decoration: none;"">info@booklibbooks.com</a><br />
            Phone: +977 01-4123456
          </p>
        </td>

        <!-- Right: Invoice Info -->
        <td valign=""top"" align=""right"" style=""width: 50%; padding-left: 1rem;"">
          <h3 style=""font-size: 1.25rem; font-weight: 600; color: #1f2937; margin: 0;"">Invoice</h3>
          <p style=""color: #4b5563; margin-top: 0.5rem;""><strong>Invoice No:</strong> {invoice.invoice_no}</p>
          <p style=""color: #4b5563;""><strong>Date:</strong> {invoice.issued_ts.ToString("MMM dd,yyyy")}</p>
          <div style=""display: inline-block; background-color: #d1fae5; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #a7f3d0; text-align: right; margin-top: 0.5rem;"">
            <p style=""color: #065f46; font-weight: bold; margin: 0;"">Claim Code</p>
            <p style=""font-family: monospace; font-size: 1rem; color: #047857; margin: 0;"">{order.claim_code}</p>
            <p style=""font-size: 0.75rem; color: #047857; margin: 0;"">Present this code when picking up your order</p>
          </div>
        </td>
      </tr>
    </table>

    <!-- Customer Info -->
    <div style=""padding: 1.25rem; border-bottom: 1px solid #e5e7eb;"">
      <h3 style=""font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;"">Customer Information</h3>
      <div style=""display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.875rem; color: #4b5563;"">
        <div style=""flex: 1; min-width: 280px;"">
          <p><strong>Name:</strong> {order.first_name} {order.last_name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Address:</strong> {order.address_line_1}, {order.state}, {order.zip_code}</p>
        </div>
        <div style=""flex: 1; min-width: 280px;"">
          <p><strong>Membership ID:</strong> {user.MembershipCode}</p>
          <p><strong>Payment Method:</strong> Cash on Delivery</p>
          <p><strong>Pickup Location:</strong> Bibliophile Books Main Store</p>
        </div>
      </div>
    </div>

    <!-- Order Items -->
    <div style=""padding: 1.25rem; border-bottom: 1px solid #e5e7eb;"">
      <h3 style=""font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;"">Order Details</h3>
      <table style=""width: 100%; font-size: 0.875rem; border-collapse: collapse;"">
        <thead>
          <tr style=""background-color: #f9fafb; color: #4b5563; text-align: left;"">
            <th style=""padding: 0.5rem;"">Item</th>
            <th style=""padding: 0.5rem; text-align: center;"">Qty</th>
            <th style=""padding: 0.5rem; text-align: right;"">Price</th>
            <th style=""padding: 0.5rem; text-align: right;"">Discount</th>
            <th style=""padding: 0.5rem; text-align: right;"">Total</th>
          </tr>
        </thead>
        <tbody>";
        
            foreach(var x in orderItems)
            {
                html += $@"
  <tr style=""border-top: 1px solid #f3f4f6;"">
            <td style=""padding: 0.5rem;"">{x.BookDetails.title}</td>
            <td style=""padding: 0.5rem; text-align: center;"">{x.quantity}</td>
            <td style=""padding: 0.5rem; text-align: right;"">Rs. {x.price.ToString("F2")}</td>
            <td style=""padding: 0.5rem; text-align: right;"">Rs. {x.discount.ToString("F2")}</td>
            <td style=""padding: 0.5rem; text-align: right; font-weight: 500;"">Rs. {x.total_price.ToString("F2")}</td>
          </tr>

";
            }
        
      html  +=$@"
        </tbody>
      </table>
    </div>

    <!-- Summary -->
    <div style=""padding: 1.25rem;"">
      <div style=""max-width: 300px; margin-left: auto; font-size: 0.875rem; color: #374151;"">
        <div style=""display: flex; justify-content: space-between; padding: 0.25rem 0;"">
          <span>Subtotal:</span>
          <span style=""font-weight: 500;"">Rs {invoice.total_amount.ToString("F2")}</span>
        </div>
        <div style=""display: flex; justify-content: space-between; color: #047857; padding: 0.25rem 0;"">
          <span>Volume Discount (5+ books) (5%):</span>
          <span style=""font-weight: 500;"">- Rs {invoice.bulk_discount.ToString("F2")}</span>
        </div>
        <div style=""display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 1px solid #e5e7eb; font-size: 1rem; font-weight: bold;"">
          <span>Total:</span>
          <span>Rs {invoice.grand_total_amount.ToString("F2")}</span>
        </div>
      </div>

      <div style=""margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; font-size: 0.875rem;"">
        <div style=""display: flex; flex-wrap: wrap; gap: 1.5rem;"">
          <div style=""flex: 1; min-width: 280px;"">
            <h4 style=""font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;"">Instructions:</h4>
            <ol style=""color: #4b5563; padding-left: 1rem; list-style-type: decimal; margin: 0;"">
              <li>Please present your membership ID and claim code at our store counter.</li>
              <li>Orders must be picked up within 7 days of purchase.</li>
              <li>For questions, contact support@booklib.com</li>
            </ol>
          </div>
          <div style=""flex: 1; min-width: 280px;"">
            <h4 style=""font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;"">Loyalty Program:</h4>
            <ul style=""color: #4b5563; padding-left: 1rem; list-style-type: disc; margin: 0;"">
              <li>5% off for 5+ books per order</li>
              <li>10% off after 10 successful orders</li>
              <li>Leave a review to earn loyalty points</li>
            </ul>
          </div>
        </div>
        <div style=""margin-top: 1rem; text-align: center; font-size: 0.75rem; color: #6b7280;"">
          <p>Thank you for shopping with BookLib!</p>
          <p>This invoice was generated electronically and is valid without a signature.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

";
            return html;
        }

    }
}
