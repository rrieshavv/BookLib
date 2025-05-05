import React from 'react';

const Category = () => {
  const handleClick = (category) => {
    console.log('Clicked category:', category);

    // Scroll to book catalog section
    const catalog = document.getElementById('book-catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { icon: 'book.png', label: 'All Books', value: 'all' },
    { icon: 'best-seller.png', label: 'Best Sellers', value: 'bestseller' },
    { icon: 'new-arival.png', label: 'New Releases', value: 'new' },
    { icon: 'deal.png', label: 'Deals', value: 'deal' },
    { icon: 'award.png', label: 'Award Winners', value: 'award' },
  ];

  return (
    <section className="py-12 bg-[#f4f1ea]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {categories.map(({ icon, label, value }) => (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className="focus:outline-none hover:scale-105 transition transform duration-200"
          >
            <img
              src={`../src/assets/${icon}`}
              alt={label}
              className="mx-auto mb-2 w-16 h-16 object-contain"
            />
            <p className="font-medium">{label}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Category;
