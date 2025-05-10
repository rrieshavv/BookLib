import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, StarHalf, Heart, ShoppingCart, Award, Calendar, BookOpen, Info, Clock, Check, X, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { getBookById } from '../services/bookService';

export default function BookDetailsPage() {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [expandedSection, setExpandedSection] = useState('details');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      // Validate id
      if (!id || id === 'undefined') {
        setError('Invalid book ID.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getBookById(id);
  
        const book = response.data; 
        if (!book) {
          throw new Error('No book data returned from API.');
        }
        setBookData({
          id: book.id,
          title: book.title,
          author: book.authors[0]?.name || 'Unknown Author',
          coverImage: book.imageUrl,
          price: book.price,
          originalPrice: book.isOnSale ? book.price * 1.2 : book.price,
          discountPercent: book.isOnSale ? 16 : 0,
          onSale: book.isOnSale,
          saleEnds: book.isOnSale ? 'May 20, 2025' : null,
          publisher: book.publishers[0]?.name || 'Unknown Publisher',
          publishDate: new Date(book.publicationDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          isbn: book.isbn,
          language: book.language,
          format: book.format,
          pages: book.stockQty || 300,
          rating: 4.7, 
          reviewCount: 128, 
          stockStatus: book.stockQty > 0 ? `In Stock (${book.stockQty} copies)` : 'Out of Stock',
          libraryStatus: book.stockQty > 0 ? 'Available for in-store reading' : 'Not Available',
          description: book.description,
          genres: book.genres.map((g) => g.name),
          awards: [],
          tags: book.format.includes('Signed') ? ['Signed Copy'] : [],
          inWishlist: false,
          reviews: [
           
            {
              id: 'rev-001',
              user: 'BookLover42',
              rating: 5,
              date: 'April 28, 2025',
              comment: 'Absolutely breathtaking prose!',
            },
            {
              id: 'rev-002',
              user: 'LiteraryExplorer',
              rating: 4,
              date: 'April 15, 2025',
              comment: 'A fascinating exploration of literary history.',
            },
          ],
        });
        setIsWishlisted(false);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book data:', err);
        setError('Failed to load book details. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);


  // Handle loading state
  if (loading) {
    return <div className="max-w-6xl mx-auto p-4 text-center">Loading...</div>;
  }

  // Handle error or no book data
  if (error || !bookData) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-red-500">
        {error || 'Book not found.'}
      </div>
    );
  }

  const incrementQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} copies of "${bookData.title}" to your cart!`);
  };

  const submitReview = () => {
    alert(`Thank you for your ${reviewRating}-star review!`);
    setReviewComment('');
    setShowReviewForm(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-yellow-500 fill-yellow-500" size={16} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-yellow-500 fill-yellow-500" size={16} />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={16} />);
    }

    return stars;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      
      <div className="text-sm text-gray-500 mb-6">
        Books / {bookData.genres[0]} / {bookData.title}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Image Column */}
        <div className="md:col-span-1">
          <div className="sticky top-8">
            <div className="relative">
              <img src={bookData.coverImage} alt={bookData.title} className="w-full rounded shadow-lg" />
              {bookData.onSale && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {bookData.discountPercent}% OFF
                </div>
              )}
              {bookData.tags.includes('Signed Copy') && (
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Signed Copy
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-center space-x-2">
              <div className="border border-gray-300 rounded p-2 bg-gray-50 text-center w-1/2">
                <div className="text-sm text-gray-500">ISBN</div>
                <div className="text-xs">{bookData.isbn}</div>
              </div>
              <div className="border border-gray-300 rounded p-2 bg-gray-50 text-center w-1/2">
                <div className="text-sm text-gray-500">Format</div>
                <div className="text-xs">{bookData.format.split(' ')[0]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Details Column */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{bookData.title}</h1>
          <h2 className="text-xl text-gray-600 mb-3">by {bookData.author}</h2>

          <div className="flex items-center mb-4 space-x-2">
            <div className="flex items-center">{renderStars(bookData.rating)}</div>
            <span className="text-gray-700 font-medium">{bookData.rating}</span>
            <span className="text-gray-500">({bookData.reviewCount} reviews)</span>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-baseline">
              {bookData.onSale ? (
                <>
                  <span className="text-3xl font-bold text-gray-800">${bookData.price.toFixed(2)}</span>
                  <span className="ml-2 text-xl text-gray-500 line-through">${bookData.originalPrice.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-red-500 font-medium">Sale ends {bookData.saleEnds}</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-800">${bookData.price.toFixed(2)}</span>
              )}
            </div>
          </div>

          <div className="flex items-center mb-8 text-sm">
            <div className="mr-6 flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  bookData.stockStatus.includes('In Stock') ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              ></div>
              <span>{bookData.stockStatus}</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  bookData.libraryStatus.includes('Available') ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              ></div>
              <span>{bookData.libraryStatus}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-8">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-l-md"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-md"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center justify-center"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>

            <button
              onClick={toggleWishlist}
              className={`p-2 rounded-md ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
            >
              <Heart size={20} className={isWishlisted ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Book Information Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-6">
              <button
                onClick={() => setTab('description')}
                className={`py-3 px-1 font-medium ${
                  tab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setTab('details')}
                className={`py-3 px-1 font-medium ${
                  tab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setTab('reviews')}
                className={`py-3 px-1 font-medium ${
                  tab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews ({bookData.reviewCount})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            {tab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">{bookData.description}</p>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {bookData.genres.map((genre) => (
                      <span key={genre} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {bookData.awards.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Awards & Recognition</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {bookData.awards.map((award) => (
                        <li key={award} className="flex items-start mb-1">
                          <Award size={16} className="mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                          <span>{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {bookData.tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Special Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {bookData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'details' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Book Details</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">Title</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.title}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">Author</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.author}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">ISBN</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.isbn}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">Publisher</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.publisher}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">Publication Date</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.publishDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">Additional Information</h3>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">Language</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.language}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">Format</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.format}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">Pages</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.pages}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 text-gray-500">Genres</td>
                          <td className="py-3 text-gray-800 font-medium">{bookData.genres.join(', ')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">Ordering Information</h3>
                  <div className="text-sm text-gray-700">
                    <p className="mb-2">
                      <span className="font-medium">Order Process:</span> After placing your order online,
                      you'll receive a confirmation email with a claim code.
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Pick-up:</span> Visit our store with your membership ID
                      and claim code to complete your purchase.
                    </p>
                    <p>
                      <span className="font-medium">Discounts:</span> Orders of 5+ books receive a 5%
                      discount. After every 10 successful orders, earn a 10% stackable discount!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-800 text-lg">Customer Reviews</h3>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Write a Review
                  </button>
                </div>

                {showReviewForm && (
                  <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Your Review</h4>
                    <div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-sm">Rating</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                size={24}
                                className={`${reviewRating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-sm">Comment</label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 h-24"
                          placeholder="Share your thoughts about this book..."
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={submitReview}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  {bookData.reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className={`mb-6 flex items-start ${index < bookData.reviews.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}
                    >
                      <div className="flex-shrink-0 bg-blue-100 text-blue-600 h-10 w-10 rounded-full flex items-center justify-center font-medium mr-4">
                        {review.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-gray-800 mr-2">{review.user}</span>
                          <div className="flex items-center">{renderStars(review.rating)}</div>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">{review.date}</div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  ))}

                  <div className="text-center mt-8">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      See All {bookData.reviewCount} Reviews
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
}