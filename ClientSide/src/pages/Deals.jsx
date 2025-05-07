import React, { useState, useEffect, useRef } from "react";
import DealsHeroBanner from "../components/DealsHero";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import DealsContent from "../components/DealsContent";
import DealItems from "../components/DealItems";
import DealsLimitedTimeBanner from "../components/DealsLimitedTimeBanner";


const DealPage = () => {
  // Sample sale items - in a real app, you'd fetch this from your API/database
  const [saleItems, setSaleItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  
  // Create a ref for the deal items section
  const dealItemsRef = useRef(null);

  // Function to handle smooth scrolling
  const scrollToDeals = () => {
    dealItemsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simulating data fetch
  useEffect(() => {
    // In a real app, replace this with API call
    const fetchSaleItems = () => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const items = [
          {
            id: 1,
            name: "Harry Potter and the Philosopher's Stone",
            originalPrice: 950,
            salePrice: 599,
            discount: 23,
            image: "../src/assets/books/harry-potter.jpg",
            author: "J.K. Rowling",
            category: "mystery",
            rating: 4,
            reviewCount: 237
          },
          {
            id: 2,
            name: "To Kill a Mockingbird",
            originalPrice: 799,
            salePrice: 599,
            discount: 26,
            image: "../src/assets/books/tokill-a-mockingbird.jpg",
            author: "Harper Lee",
            category: "mystery",
            rating: 5,
            reviewCount: 142
          },
          {
            id: 3,
            name: "Pride and Prejudice",
            originalPrice: 750,
            salePrice: 550,
            discount: 31,
            image: "../src/assets/books/pride-preduce.jpg",
            author: "By Jane Austen",
            category: "classic",
            rating: 4,
            reviewCount: 98
          },
          {
            id: 4,
            name: "Cloud Atlas",
            originalPrice: 750,
            salePrice: 499,
            discount: 29,
            image: "../src/assets/books/cloud-atlas.jpg",
            author: "David Mitchell",
            category: "fiction",
            rating: 3,
            reviewCount: 76
          },
          {
            id: 5,
            name: "Life After Life",
            originalPrice: 1440,
            salePrice: 999,
            discount: 25,
            image: "../src/assets/books/life-after-life.jpg",
            author: "Kate Atkinson",
            category: "non-fiction",
            rating: 5,
            reviewCount: 63
          },
        ];
        setSaleItems(items);
        setIsLoading(false);
      }, 800);
    };

    fetchSaleItems();
  }, []);

  // Filter the items based on selected category
  const filteredItems = filter === "all" 
    ? saleItems 
    : saleItems.filter(item => item.category === filter);

  return (
    <div className="bg-[#f4f1ea] text-gray-800 font-sans min-h-screen">
      {/* Hero Section for Deals */}
      <DealsHeroBanner onSaveClick={scrollToDeals} />

      {/* Deal Content */}
      <div className="container mx-auto py-12 px-4">
      <DealsContent filter={filter} setFilter={setFilter} />

        {/* Deal Items */}
        <DealItems
        items={filteredItems}
        isLoading={isLoading}
        dealItemsRef={dealItemsRef}
        />

        {/* Limited time banner */}
        <DealsLimitedTimeBanner />
      </div>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DealPage;