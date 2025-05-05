import React from 'react';

function Testimonials() {
  return (
    <div>
      <section className="bg-[#f4f1ea] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Readers Say</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <p className="text-sm text-gray-700">
                "The range and service at BookLib is amazing. Highly recommended for book lovers!"
              </p>
              <h4 className="mt-4 font-semibold">— Sita Sharma</h4>
            </div>

            {/* You can duplicate this div below for more testimonials */}
            <div className="bg-white p-6 rounded shadow">
              <p className="text-sm text-gray-700">
                "Excellent customer support and a huge variety of books. Love it!"
              </p>
              <h4 className="mt-4 font-semibold">— Rajeev Thapa</h4>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <p className="text-sm text-gray-700">
                "Fast delivery and amazing quality. BookLib never disappoints."
              </p>
              <h4 className="mt-4 font-semibold">— Nisha Adhikari</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
