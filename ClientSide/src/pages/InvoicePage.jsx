import React, { useRef } from "react";
import Footer from "../components/Footer";

const InvoicePage = () => {
  // Generate a random claim code
  const claimCode = `BOOK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  // Generate invoice number and order date
  const invoiceNumber = `INV-${Date.now().toString().substring(4)}`;
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Created a ref for the printable content
  const componentRef = useRef();
  
  // Handle print functionality with print-specific styles
  const handlePrint = () => {
    const content = document.getElementById('invoice-content');
    const originalContents = document.body.innerHTML;
    
    // Created a style element for print-specific styles
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 0.5cm;
        }
        body {
          font-size: 10pt;
        }
        .p-8 {
          padding: 1rem !important;
        }
        .py-3 {
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
        }
        .mt-8 {
          margin-top: 1rem !important;
        }
        .pt-8 {
          padding-top: 1rem !important;
        }
        .gap-6 {
          gap: 0.75rem !important;
        }
        .gap-8 {
          gap: 1rem !important;
        }
        .mb-4 {
          margin-bottom: 0.5rem !important;
        }
        .space-y-1 > * + * {
          margin-top: 0.15rem !important;
        }
      }
    `;
    
    document.head.appendChild(printStyles);
    document.body.innerHTML = content.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Mock order data (would come from checkout in a real app)
  const order = {
    customer: {
      firstName: "Ramesh",
      lastName: "Shrestha",
      phone: "+977 9800000000",
      address: "Street, Tole, House No.",
      district: "Kathmandu",
      municipality: "Budhanilkantha-1",
      province: "Bagmati",
      country: "Nepal",
    },
    items: [
      { id: 1, title: "Atomic Habits", author: "James Clear", quantity: 2, price: 500, total: 1000 },
      { id: 2, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", quantity: 1, price: 750, total: 750 },
      { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", quantity: 1, price: 600, total: 600 },
    ],
    subtotal: 2350,
    discount: {
      type: "Volume Discount (5+ books)",
      percentage: 5,
      amount: 117.5,
    },
    total: 2232.5,
    paymentMethod: "Cash on Delivery",
    membershipID: "MEM12345",
  };

  return (
    <>
      <div className="bg-[#f4f1ea] font-sans min-h-screen pt-0 pb-16">
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-700">Invoice</h1>
            <button 
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Invoice
            </button>
          </div>
          
          {/* Printable Invoice */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" id="invoice-content" ref={componentRef}>
            {/* Invoice Header - Reduced padding */}
            <div className="p-6 bg-emerald-50 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-emerald-800">BookLib</h2>
                  <p className="text-gray-600">Your Gateway to Literary Adventures</p>
                  <p className="text-gray-600 mt-1">
                    Kamal Pokhari, Kathmandu<br />
                    Nepal<br />
                    Email: info@booklibbooks.com<br />
                    Phone: +977 01-4123456
                  </p>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-semibold text-gray-800">Invoice</h3>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium">Invoice No:</span> {invoiceNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {orderDate}
                  </p>
                  <div className="mt-2 bg-emerald-100 p-3 rounded-lg border border-emerald-200">
                    <p className="text-emerald-800 font-bold">Claim Code</p>
                    <p className="text-lg font-mono tracking-wider text-emerald-700">{claimCode}</p>
                    <p className="text-xs text-emerald-700">Present this code when picking up your order</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Customer Information - Reduced padding */}
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Name:</span> {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Phone:</span> {order.customer.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span> {order.customer.address}, {order.customer.municipality}, {order.customer.district}, {order.customer.province}, {order.customer.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Membership ID:</span> {order.membershipID}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Payment Method:</span> {order.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Pickup Location:</span> Bibliophile Books Main Store
                  </p>
                </div>
              </div>
            </div>
            
            {/* Order Items - Reduced padding */}
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Details</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-3 text-left font-semibold text-gray-600">Item</th>
                      <th className="py-2 px-3 text-left font-semibold text-gray-600">Author</th>
                      <th className="py-2 px-3 text-center font-semibold text-gray-600">Qty</th>
                      <th className="py-2 px-3 text-right font-semibold text-gray-600">Price</th>
                      <th className="py-2 px-3 text-right font-semibold text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-t border-gray-100">
                        <td className="py-2 px-3 text-gray-800">{item.title}</td>
                        <td className="py-2 px-3 text-gray-600">{item.author}</td>
                        <td className="py-2 px-3 text-center text-gray-800">{item.quantity}</td>
                        <td className="py-2 px-3 text-right text-gray-800">Rs {item.price}</td>
                        <td className="py-2 px-3 text-right font-medium text-gray-800">Rs {item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Order Summary - Reduced padding and spacing */}
            <div className="p-5">
              <div className="flex flex-col items-end">
                <div className="w-full max-w-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-800">Rs {order.subtotal}</span>
                  </div>
                  
                  {order.discount && (
                    <div className="flex justify-between py-1 text-emerald-700">
                      <span>{order.discount.type} ({order.discount.percentage}%):</span>
                      <span className="font-medium">- Rs {order.discount.amount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-1 border-t border-gray-200 mt-1 text-lg font-bold">
                    <span>Total:</span>
                    <span>Rs {order.total}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Instructions:</h4>
                    <ol className="text-xs text-gray-600 list-decimal pl-4 space-y-0.5">
                      <li>Please present your membership ID and claim code at our store counter.</li>
                      <li>Orders must be picked up within 7 days of purchase.</li>
                      <li>For any questions regarding your order, contact us at support@bibliophilebooks.com</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Loyalty Program:</h4>
                    <ul className="text-xs text-gray-600 list-disc pl-4 space-y-0.5">
                      <li>Purchase 5+ books in one order to receive a 5% discount.</li>
                      <li>After every 10 successful orders, earn a 10% stackable discount on your next purchase.</li>
                      <li>Leave a review to earn loyalty points!</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-xs text-gray-500">
                  <p>Thank you for shopping with BookLib!</p>
                  <p className="mt-0.5">This invoice was generated electronically and is valid without a signature.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Return to Shop Button */}
          <div className="mt-8 text-center">
            <a 
              href="/catalogue" 
              className="inline-flex items-center text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Shop
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default InvoicePage;