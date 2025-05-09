import React from "react";
import NavBar from "../components/NavBar";
import Catalog from "../components/Catalog";
import Footer from "../components/Footer";

const CatalogPage = () => {
  return (
    <div className="bg-[#f4f1ea] text-gray-800 font-sans min-h-screen">
      {/* Navigation Bar */}
      <NavBar theme="light" />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16">
        <Catalog />
      </div>

      {/* Added a quote section */}  
      <section className="bg-emerald-50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium text-emerald-800">
            “A reader lives a thousand lives before he dies. The man who never reads lives only one.” – George R.R. Martin
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CatalogPage;



