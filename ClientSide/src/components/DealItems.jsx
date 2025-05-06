import React from "react";

const DealItems = ({ items, isLoading, dealItemsRef }) => {
  return (
    <div ref={dealItemsRef}>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-800"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#fdfaf5] p-4 rounded shadow hover:shadow-lg flex flex-col justify-between min-h-[520px] relative"
            >
              {/* Deal Tag */}
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Deal
                </span>
              </div>

              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto object-contain rounded"
                />
                <h3 className="mt-4 font-semibold text-lg">{item.name}</h3>
                {item.author && (
                  <p className="text-sm text-gray-600">By {item.author}</p>
                )}

                {/* Ratings */}
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${
                          i < item.rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">
                    ({item.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm text-gray-500 line-through">
                    Rs. {item.originalPrice}
                  </p>
                  <p className="font-semibold text-emerald-700">
                    Rs. {item.salePrice}
                  </p>
                </div>

                {/* Stock Label */}
                <div className="mt-2 flex items-center text-xs">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Button */}
              <button className="mt-4 bg-emerald-600 text-white text-sm px-4 py-2 rounded hover:bg-emerald-700">
                Order Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl">No deals found in this category at the moment.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 px-6 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-900"
          >
            View All Deals
          </button>
        </div>
      )}
    </div>
  );
};

export default DealItems;
