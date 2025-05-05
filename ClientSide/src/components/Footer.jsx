import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="bg-[#1e1e1e] text-gray-300 py-8 text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 px-4">
          <div>
            <h4 className="font-bold mb-2">BookLib</h4>
            <p>Read More. Know More.</p>
          </div>

          <div>
            <h4 className="font-bold mb-2">Explore</h4>
            <ul className="space-y-1">
              <li><a href="#">All Books</a></li>
              <li><a href="#">Deals</a></li>
              <li><a href="#">Coming Soon</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="#">About</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">X</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
