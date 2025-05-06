import React from 'react';

const AboutUsValues = () => {
  return (
    <section className="py-20 px-6 bg-emerald-700 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Values</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-emerald-100">We continuously push boundaries and embrace new technologies to deliver cutting-edge solutions.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <p className="text-emerald-100">We believe in the power of teamwork and open communication to achieve exceptional results.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p className="text-emerald-100">We maintain the highest standards in everything we do, from code to customer service.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsValues;
