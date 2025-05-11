import React, { useState } from 'react';
import { updateBook } from '../../../services/bookService';

const BookEditForm = ({ book, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: book.title || '',
    isbn: book.isbn || '',
    publicationDate: book.publicationDate ? new Date(book.publicationDate).toISOString().split('T')[0] : '',
    description: book.description || '',
    price: book.price || 0,
    language: book.language || '',
    format: book.format || '',
    stockQty: book.stockQty || 0,
    isOnSale: book.isOnSale || false,
    authorIds: book.authors?.map(author => author.id) || [],
    genreIds: book.genres?.map(genre => genre.id) || [],
    publisherIds: book.publishers?.map(publisher => publisher.id) || [],
    imageFile: null
  });

  const [imagePreview, setImagePreview] = useState(book.imageUrl || null);
  
  // For the existing authors, genres, and publishers
  const existingAuthors = book.authors || [];
  const existingGenres = book.genres || [];
  const existingPublishers = book.publishers || [];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      // Handle image file
      if (files[0]) {
        setFormData({ ...formData, imageFile: files[0] });
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'price' || name === 'stockQty') {
      // Convert to appropriate number type
      setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) : parseInt(value, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Create FormData object for file upload
      const bookFormData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'imageFile') {
          if (formData.imageFile) {
            bookFormData.append('imageFile', formData.imageFile);
          }
        } else if (Array.isArray(formData[key])) {
          // Handle arrays like authorIds
          formData[key].forEach(id => {
            bookFormData.append(`${key}`, id);
          });
        } else {
          bookFormData.append(key, formData[key]);
        }
      });
      
      // Send update request
      const response = await updateBook(book.id, bookFormData);
      
      if (response.code === 0) {
        setSuccess(true);
        if (onSuccess) onSuccess(response.data);
      } else {
        setError(response.message || 'Failed to update book');
      }
    } catch (err) {
      setError(err.message || 'Failed to update book');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Edit Book</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
          Book updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength="255"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isbn">
                ISBN *
              </label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength="50"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publicationDate">
                Publication Date *
              </label>
              <input
                type="date"
                id="publicationDate"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Price *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="0.01"
                step="0.01"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">
                Language *
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength="50"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="format">
                Format *
              </label>
              <input
                type="text"
                id="format"
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength="255"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stockQty">
                Stock Quantity *
              </label>
              <input
                type="number"
                id="stockQty"
                name="stockQty"
                value={formData.stockQty}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="0"
              />
            </div>
            
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isOnSale"
                name="isOnSale"
                checked={formData.isOnSale}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm font-bold" htmlFor="isOnSale">
                On Sale
              </label>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Authors *
              </label>
              <div className="mb-2">
                <p className="text-sm text-gray-600">Currently assigned:</p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {existingAuthors.map(author => (
                    <li key={author.id}>{author.name}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: To change authors, you'll need to add the author management feature
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Genres *
              </label>
              <div className="mb-2">
                <p className="text-sm text-gray-600">Currently assigned:</p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {existingGenres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: To change genres, you'll need to add the genre management feature
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Publishers *
              </label>
              <div className="mb-2">
                <p className="text-sm text-gray-600">Currently assigned:</p>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {existingPublishers.map(publisher => (
                    <li key={publisher.id}>{publisher.name}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: To change publishers, you'll need to add the publisher management feature
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageFile">
                Book Cover Image
              </label>
              <div className="flex items-center">
                {imagePreview && (
                  <div className="mr-4">
                    <img 
                      src={imagePreview} 
                      alt="Book cover preview" 
                      className="h-24 w-auto object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="5"
            required
          ></textarea>
        </div>
        
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookEditForm;