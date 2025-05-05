import React from 'react';

function Newsletter() {
  return (
    <div>
      <section className="bg-[#e7dfd5] py-12 px-4 text-center">
        <h3 className="text-xl font-semibold mb-4">Subscribe and get a 10% Off</h3>
        <div className="max-w-md mx-auto flex items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-l border border-gray-300 bg-white"
          />
          <button className="bg-emerald-700 text-white px-6 py-2 rounded-r hover:bg-emerald-800">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}

export default Newsletter;
