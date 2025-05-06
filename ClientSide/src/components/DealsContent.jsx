import React from "react";

const DealsContent = ({ filter, setFilter }) => {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold mb-6">Limited Time Book Offers</h2>
      <p className="text-lg max-w-2xl mx-auto">
        Explore a curated collection of bestselling novels, inspiring non-fiction, and timeless classics —
        all at irresistible prices. Grab your next great read before the deal disappears!
      </p>

      {/* Filter Categories */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {[
          { label: "All Books", value: "all" },
          { label: "Mystery", value: "mystery" },
          { label: "Classic", value: "classic" },
          { label: "Fiction", value: "fiction" },
          { label: "Non-Fiction", value: "non-fiction" }
        ].map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-6 py-2 rounded-full border border-emerald-800 ${
              filter === cat.value
                ? "bg-emerald-800 text-white"
                : "text-emerald-700 hover:bg-emerald-800/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DealsContent;
