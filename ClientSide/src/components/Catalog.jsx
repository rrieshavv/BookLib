import React, { useState } from 'react';
import { Filter } from 'lucide-react';

const Catalog = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Book Catalogue</h2>

            {/* Filter Button */}
            <button
              onClick={toggleFilter}
              className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>

          {/* Filter Panel */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} bg-[#fdfaf5] p-6 rounded-lg shadow-md mb-8`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Author */}
              <div>
                <label className="block text-sm font-semibold mb-2">Author</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
                  <option value="">All Authors</option>
                  <option value="robert-kiyosaki">Robert Kiyosaki</option>
                  <option value="jk-rowling">J.K. Rowling</option>
                  <option value="sarah-maas">Sarah J. Maas</option>
                  <option value="chris-whitaker">Chris Whitaker</option>
                </select>
              </div>

              {/* Genre */}
              <div>
                <label className="block text-sm font-semibold mb-2">Genre</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
                  <option value="">All Genres</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="mystery">Mystery</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-semibold mb-2">Format</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
                  <option value="">All Formats</option>
                  <option value="paperback">Paperback</option>
                  <option value="hardcover">Hardcover</option>
                  <option value="signed">Signed Edition</option>
                  <option value="limited">Limited Edition</option>
                  <option value="deluxe">Deluxe Edition</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold mb-2">Price Range</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" />
                  <span>-</span>
                  <input type="number" placeholder="Max" className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" />
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold mb-2">Language</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
                  <option value="">All Languages</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="spanish">Spanish</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold mb-2">Availability</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    In Stock
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Library Access
                  </label>
                </div>
              </div>

              {/* Publisher */}
              <div>
                <label className="block text-sm font-semibold mb-2">Publisher</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
                  <option value="">All Publishers</option>
                  <option value="penguin">Penguin Random House</option>
                  <option value="harpercollins">HarperCollins</option>
                  <option value="simon">Simon & Schuster</option>
                </select>
              </div>

              {/* Ratings */}
              <div>
                <label className="block text-sm font-semibold mb-2">Minimum Rating</label>
                <div className="flex items-center">
                  <select className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
                    <option value="">Any Rating</option>
                    <option value="5">★★★★★ (5 stars)</option>
                    <option value="4">★★★★☆ (4+ stars)</option>
                    <option value="3">★★★☆☆ (3+ stars)</option>
                    <option value="2">★★☆☆☆ (2+ stars)</option>
                  </select>
                </div>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-semibold mb-2">Search</label>
                <input type="text" placeholder="Title, ISBN or Description" className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" />
              </div>
            </div>

            {/* Sorting & Apply Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-semibold mb-2">Sort By</label>
                <select className="w-full md:w-48 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white">
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="title">Title: A-Z</option>
                </select>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="w-full md:w-auto bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition">
                  Reset
                </button>
                <button className="w-full md:w-auto bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <section id="book-catalog" className="bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Book 1 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">Bestseller</span>
              </div>
              <div>
                <img src="../src/assets/books/rich-dad-poor-dad.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
                <h3 className="mt-4 font-semibold text-lg">Rich Dad Poor Dad</h3>
                <p className="text-sm text-gray-600">By Robert Kiyosaki</p>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                      </svg>
                    ))}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </svg>
                  </div>
                  <span className="ml-1 text-xs text-gray-500">(487)</span>
                </div>
                <div className="flex items-center mt-2">
                  <p className="font-semibold text-emerald-700">Rs. 499</p>
                </div>
                <div className="mt-2 flex items-center text-xs">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">In Stock</span>
                </div>
              </div>
              <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">Order Now</button>
            </div>

            {/* Book 2 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Deal Tag */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Deals</span>
            </div>

            {/* Book Content */}
            <div>
              <img
                src="../src/assets/books/harry-potter.jpg"
                alt="Book"
                className="w-full h-auto object-contain rounded"
              />
              <h3 className="mt-4 font-semibold text-lg">
                Harry Potter and the Philosopher's Stone
              </h3>
              <p className="text-sm text-gray-600">By J.K. Rowling</p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                </div>
                <span className="ml-1 text-xs text-gray-500">(620)</span>
              </div>

              {/* Price */}
              <div className="flex items-center mt-2 gap-2">
                <p className="text-sm text-gray-500 line-through">Rs. 950</p>
                <p className="font-semibold text-emerald-700">Rs. 599</p>
              </div>

              <div className="mt-2 flex items-center text-xs">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">In Stock</span>
              </div>
            </div>

            {/* Order Button */}
            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
            </div>



            {/* Book 3 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* New Release Tag */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">New Release</span>
            </div>

            <div>
              <img
                src="../src/assets/books/thorn-court.jpg"
                alt="Book"
                className="w-full h-auto object-contain rounded"
              />
              <h3 className="mt-4 font-semibold text-lg">A Court of Thorns and Roses</h3>
              <p className="text-sm text-gray-600">By Sarah J. Maas</p>

              {/* Ratings */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">(321)</span>
              </div>

              {/* Price */}
              <div className="flex items-center mt-2">
                <p className="font-semibold text-emerald-700">Rs. 958</p>
              </div>

              <div className="mt-2 flex items-center text-xs">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">In Stock</span>
              </div>
            </div>

            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
            </div>


            {/* Book 4 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* New Release Tag */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">New Release</span>
            </div>

            <div>
              <img
                src="../src/assets/books/we-begin-at-the-end.jpg"
                alt="Book"
                className="w-full h-auto object-contain rounded"
              />
              <h3 className="mt-4 font-semibold text-lg">We Begin at the End</h3>
              <p className="text-sm text-gray-600">By Chris Whitaker</p>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                </div>
                <span className="ml-1 text-xs text-gray-500">(620)</span>
              </div>
              <div className="flex items-center mt-2">
                <p className="font-semibold text-emerald-700">Rs. 2599</p>
              </div>

              {/* Out of Stock Badge */}
              <div className="mt-2 flex items-center text-xs">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Out of Stock</span>
              </div>
            </div>

            {/* Disabled Button */}
            <button
              className="mt-4 bg-gray-400 text-white text-sm px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              Order Now
            </button>
            </div>
          </div>
          </section>

          
          {/* Second Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {/* Book 5 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Deal Tag */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Deal</span>
            </div>

            <div>
              <img
                src="../src/assets/books/tokill-a-mockingbird.jpg"
                alt="Book"
                className="w-full h-auto object-contain rounded"
              />
              <h3 className="mt-4 font-semibold text-lg">To Kill a Mockingbird</h3>
              <p className="text-sm text-gray-600">By Harper Lee</p>

              {/* Ratings */}
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs text-gray-500">(892)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-gray-500 line-through">Rs. 799</p>
                <p className="font-semibold text-emerald-700">Rs. 599</p>
              </div>
            </div>

            {/* Button */}
            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>


            {/* Book 6 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Bestseller Tag */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">Bestseller</span>
            </div>

            <div>
              <img src="../src/assets/books/deep-work.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">Deep Work</h3>
              <p className="text-sm text-gray-600">By Cal Newport</p>
              <p className="font-semibold mt-2 text-emerald-700">Rs. 650</p>

              {/* Ratings */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">(368)</span>
              </div>

              <div className="mt-2 flex items-center text-xs">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">In Stock</span>
              </div>
            </div>

            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>


            {/* Book 7 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Bestseller Tag */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">Bestseller</span>
            </div>

            <div>
              <img src="../src/assets/books/the-alchemist.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">The Alchemist</h3>
              <p className="text-sm text-gray-600">By Paulo Coelho</p>
              <p className="font-semibold mt-2 text-emerald-700">Rs. 750</p>

              {/* Ratings (optional, remove if not needed) */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">(512)</span>
              </div>

              {/* Out of Stock Label */}
              <div className="mt-2 flex items-center text-xs">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Out of Stock</span>
              </div>
            </div>

            <button
              className="mt-4 bg-gray-400 text-white text-sm px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              Out of Stock
            </button>
          </div>


            {/* Book 8 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Award Winner Tag */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Award Winner</span>
            </div>

            <div>
              <img src="../src/assets/books/great-gatsby.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">The Great Gatsby</h3>
              <p className="text-sm text-gray-600">F. Scott Fitzgerald</p>
              <p className="font-semibold mt-2 text-emerald-700">Rs. 240</p>

              {/* 3-Star Rating */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">(321)</span>
              </div>
            </div>

            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>

          </div>
          
          {/* Third Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {/* Book 9 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Deal Tag */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Deal</span>
            </div>

            <div>
              <img src="../src/assets/books/pride-preduce.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">Pride and Prejudice</h3>
              <p className="text-sm text-gray-600">By Jane Austen</p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                </div>
                <span className="ml-1 text-xs text-gray-500">(451)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-gray-500 line-through">Rs. 750</p>
                <p className="font-semibold text-emerald-700">Rs. 550</p>
              </div>
            </div>

            {/* Button */}
            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>


            {/* Book 10 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Award Winner Tag */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Award Winner</span>
            </div>

            <div>
              <img src="../src/assets/books/don-quixote.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">Don Quixote</h3>
              <p className="text-sm text-gray-600">By Miguel de Cervantes</p>

              {/* Rating */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                </div>
                <span className="ml-1 text-xs text-gray-500">(412)</span>
              </div>

              {/* Price */}
              <p className="font-semibold mt-2 text-emerald-700">Rs. 958</p>
            </div>

            {/* Order Button */}
            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>


            {/* Book 11 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Bestseller Tag */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">Bestseller</span>
            </div>

            <div>
              <img src="../src/assets/books/war-peace.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">War and Peace</h3>
              <p className="text-sm text-gray-600">By Leo Tolstoy</p>

              {/* Ratings */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">(549)</span>
              </div>

              {/* Price */}
              <p className="font-semibold mt-2 text-emerald-700">Rs. 800</p>
            </div>

            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>


            {/* Book 12 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* New Arrival Tag */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">New Arrival</span>
            </div>

            <div>
              <img src="../src/assets/books/beloved.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">Beloved</h3>
              <p className="text-sm text-gray-600">By Toni Morrison</p>

              {/* Ratings */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">(198)</span>
              </div>

              {/* Price */}
              <p className="font-semibold mt-2 text-emerald-700">Rs. 2044</p>
            </div>

            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>
          </div>

          {/* Fourth Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {/* Book 13 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Deal Tag */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Deal</span>
            </div>

            <div>
              <img src="../src/assets/books/cloud-atlas.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">Cloud Atlas</h3>
              <p className="text-sm text-gray-600">By David Mitchell</p>

              {/* Price with discount */}
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-gray-500 line-through">Rs. 750</p>
                <p className="font-semibold text-emerald-700">Rs. 499</p>
              </div>

              {/* 4-Star Rating */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                </div>
                <span className="ml-1 text-xs text-gray-500">(418)</span>
              </div>
            </div>

            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>


            {/* Book 14 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Deal Tag */}
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Deal</span>
            </div>

            <div>
              <img src="../src/assets/books/life-after-life.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">Life After Life</h3>
              <p className="text-sm text-gray-600">By Kate Atkinson</p>

              {/* Price with discount */}
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-gray-500 line-through">Rs. 1440</p>
                <p className="font-semibold text-emerald-700">Rs. 999</p>
              </div>

              {/* 3-Star Rating */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">(237)</span>
              </div>
            </div>

            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>



            {/* Book 15 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
              {/* New Arrival Tag */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">New Arrival</span>
              </div>

              <div>
                <img src="../src/assets/books/normal-people.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
                <h3 className="mt-4 font-semibold text-lg">Normal People</h3>
                <p className="text-sm text-gray-600">By Sally Rooney</p>
                <p className="font-semibold mt-2 text-emerald-700">Rs. 960</p>

                {/* 4-Star Rating */}
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                      </svg>
                    ))}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  </div>
                  <span className="ml-1 text-xs text-gray-500">(412)</span>
                </div>

                {/* Out of Stock Label */}
                <div className="mt-2 flex items-center text-xs">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Out of Stock</span>
                </div>
              </div>

              <button
                className="mt-4 bg-gray-400 text-white text-sm px-4 py-2 rounded cursor-not-allowed"
                disabled
              >
                Out of Stock
              </button>
            </div>



            {/* Book 16 */}
            <div className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative">
            {/* Award Winner Tag */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
              <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Award Winner</span>
            </div>

            <div>
              <img src="../src/assets/books/rapture.jpg" alt="Book" className="w-full h-auto object-contain rounded" />
              <h3 className="mt-4 font-semibold text-lg">Rapture</h3>
              <p className="text-sm text-gray-600">By Lauren Kate</p>
              <p className="font-semibold mt-2 text-emerald-700">Rs. 1920</p>

              {/* 3-Star Rating */}
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">(312)</span>
              </div>
            </div>

            <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
              Order Now
            </button>
          </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;