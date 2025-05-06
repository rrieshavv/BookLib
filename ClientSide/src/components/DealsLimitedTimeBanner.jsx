import React from "react";

const DealsLimitedTimeBanner = () => {
  return (
    <div className="mt-16 bg-amber-100 rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold mb-3">Limited Time Offer</h3>
      <p className="text-lg mb-6">
        Use code <span className="font-bold">SPRING25</span> at checkout for an extra 10% off sale items!
      </p>
      <p className="text-sm text-gray-600">
        Valid until May 31, 2025. Cannot be combined with other offers.
      </p>
    </div>
  );
};

export default DealsLimitedTimeBanner;
