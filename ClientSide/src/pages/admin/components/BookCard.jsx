import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img
          className="h-48 w-full object-cover"
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
        />
        {book.isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
            On Sale
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="text-xs text-indigo-500 font-semibold">
          {book.genres?.map(genre => genre.name).join(', ')}
        </div>
        
        <h2 className="mt-1 text-lg font-medium text-gray-900 line-clamp-2">
          {book.title}
        </h2>
        
        <p className="text-sm text-gray-600">
          by {book.authors?.map(author => author.name).join(', ')}
        </p>
        
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">
          {book.description}
        </p>
        
        <div className="mt-auto">
          <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
            <div className="text-gray-500">ISBN:</div>
            <div className="text-right">{book.isbn}</div>
            
            <div className="text-gray-500">Format:</div>
            <div className="text-right">{book.format}</div>
            
            <div className="text-gray-500">Stock:</div>
            <div className="text-right">{book.stockQty} available</div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${book.price?.toFixed(2)}
            </span>
            
            <Link to={`/admin/books/${book.id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition">
                Manage Book
              </button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;