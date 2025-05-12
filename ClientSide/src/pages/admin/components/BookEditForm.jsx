import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  updateBook, 
  getAllAuthors, 
  getAllGenres, 
  getAllPublishers,
  getAllLanguages,
  getAllFormats
} from '../../../services/bookService';

const BookEditForm = ({ book, onCancel, onSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [formats, setFormats] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  
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
  
  useEffect(() => {
    const loadReferenceData = async () => {
      setLoadingOptions(true);
      try {
        const [authorsRes, genresRes, publishersRes, languagesRes, formatsRes] = await Promise.all([
          getAllAuthors(),
          getAllGenres(),
          getAllPublishers(),
          getAllLanguages(),
          getAllFormats()
        ]);
        
        if (authorsRes.code === 0 && authorsRes.data) {
          setAuthors(authorsRes.data);
        }
        
        if (genresRes.code === 0 && genresRes.data) {
          setGenres(genresRes.data);
        }
        
        if (publishersRes.code === 0 && publishersRes.data) {
          setPublishers(publishersRes.data);
        }
        
        if (languagesRes.code === 0 && languagesRes.data) {
          setLanguages(languagesRes.data);
        }
        
        if (formatsRes.code === 0 && formatsRes.data) {
          setFormats(formatsRes.data);
        }
      } catch (err) {
        console.error("Error loading reference data:", err);
        setError("Failed to load form options. Please try again.");
      } finally {
        setLoadingOptions(false);
      }
    };
    
    loadReferenceData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      if (files[0]) {
        setFormData({ ...formData, imageFile: files[0] });
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'price' || name === 'stockQty') {
      setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) : parseInt(value, 10) });
    } else if (name === 'authorIds' || name === 'genreIds' || name === 'publisherIds') {
      const options = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: options });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    const bookFormData = new FormData();
    
    bookFormData.append('title', formData.title);
    bookFormData.append('isbn', formData.isbn);
    bookFormData.append('publicationDate', formData.publicationDate);
    bookFormData.append('description', formData.description);
    bookFormData.append('price', formData.price.toString());
    bookFormData.append('stockQty', formData.stockQty.toString());
    bookFormData.append('isOnSale', formData.isOnSale.toString());
    bookFormData.append('language', formData.language);
    bookFormData.append('format', formData.format);
    
    if (formData.authorIds && formData.authorIds.length > 0) {
      formData.authorIds.forEach((id, index) => {
        bookFormData.append(`authorIds[${index}]`, id);
      });
    }
    
    if (formData.genreIds && formData.genreIds.length > 0) {
      formData.genreIds.forEach((id, index) => {
        bookFormData.append(`genreIds[${index}]`, id);
      });
    }
    
    if (formData.publisherIds && formData.publisherIds.length > 0) {
      formData.publisherIds.forEach((id, index) => {
        bookFormData.append(`publisherIds[${index}]`, id);
      });
    }
    
    if (formData.imageFile instanceof File && formData.imageFile.size > 0) {
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (formData.imageFile.size > MAX_FILE_SIZE) {
        setError(`Image file too large (${Math.round(formData.imageFile.size/1024/1024)}MB). Please select a file smaller than 5MB.`);
        setLoading(false);
        return;
      }
      
      bookFormData.append('imageFile', formData.imageFile);
    }
    
    try {
      const response = await updateBook(book.id, bookFormData);
      
      if (response.code === 0) {
        setSuccess(true);
        if (onSuccess) onSuccess(response.data);
        
        setTimeout(() => {
          window.location.href = `/admin/books/${book.id}`;
        }, 10);
      } else {
        setError(response.message || 'Failed to update book');
      }
    } catch (err) {
      if (err.message === 'Network Error' && err.code === 'ERR_NETWORK' 
          && err.request && err.request.status === 200) {
        console.log("Handling likely HTTP/2 protocol error after successful operation");
        setSuccess(true);
        if (onSuccess) onSuccess(null);
        
        setTimeout(() => {
          window.location.href = `/admin/books/${book.id}`;
        }, 10);
        return;
      }
      
      setError(err.response?.data?.message || err.message || 'Failed to update book');
    }
  } catch (err) {
    setError("Form processing error: " + (err.message || 'Unknown error'));
  } finally {
    setLoading(false);
  }
};

  if (loadingOptions) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">Loading form data...</span>
      </div>
    );
  }

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
            Book updated successfully! Redirecting to book details...
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select language</option>
                {languages.map(lang => (
                  <option key={lang.id || lang.code || lang} value={lang.code || lang}>
                    {lang.name || lang}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="format">
                Format *
              </label>
              <select
                id="format"
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select format</option>
                {formats.map(format => (
                  <option key={format.id || format.code || format} value={format.code || format}>
                    {format.name || format}
                  </option>
                ))}
              </select>
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
          
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authorIds">
                Authors *
              </label>
              <select
                id="authorIds"
                name="authorIds"
                multiple
                value={formData.authorIds}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                required
              >
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd key to select multiple authors</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genreIds">
                Genres *
              </label>
              <select
                id="genreIds"
                name="genreIds"
                multiple
                value={formData.genreIds}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                required
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd key to select multiple genres</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisherIds">
                Publishers *
              </label>
              <select
                id="publisherIds"
                name="publisherIds"
                multiple
                value={formData.publisherIds}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                required
              >
                {publishers.map(publisher => (
                  <option key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd key to select multiple publishers</p>
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