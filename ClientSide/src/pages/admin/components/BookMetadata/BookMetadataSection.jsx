import React, { useState, useEffect } from 'react';
import BookMetadataCard from './BookMetadataCard';
import BookMetadataForm from './BookMetadataForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import bookMetaDataService from '../../../../services/bookMetadataService';

const BookMetadataSection = ({ type }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [type]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      let response;
      switch (type.toLowerCase()) {
        case 'author':
          response = await bookMetaDataService.getAllAuthors();
          break;
        case 'publisher':
          response = await bookMetaDataService.getAllPublishers();
          break;
        case 'genre':
          response = await bookMetaDataService.getAllGenres();
          break;
        default:
          throw new Error('Invalid metadata type');
      }
      setItems(response.data || []);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch ${type.toLowerCase()}s. Please try again.`);
      console.error(`Error fetching ${type.toLowerCase()}s:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      let response;
      if (selectedItem) {
        // Update
        switch (type.toLowerCase()) {
          case 'author':
            response = await bookMetaDataService.updateAuthor(selectedItem.id, formData.name);
            break;
          case 'publisher':
            response = await bookMetaDataService.updatePublisher(selectedItem.id, formData.name);
            break;
          case 'genre':
            response = await bookMetaDataService.updateGenre(selectedItem.id, formData.name);
            break;
        }
        setItems(prev => prev.map(item => 
          item.id === selectedItem.id ? { ...item, name: formData.name } : item
        ));
      } else {
        // Create
        switch (type.toLowerCase()) {
          case 'author':
            response = await bookMetaDataService.createAuthor(formData.name);
            break;
          case 'publisher':
            response = await bookMetaDataService.createPublisher(formData.name);
            break;
          case 'genre':
            response = await bookMetaDataService.createGenre(formData.name);
            break;
        }
        setItems(prev => [response.data, ...prev]);
      }
      setIsFormOpen(false);
      setError(null);
    } catch (err) {
      setError(`Failed to ${selectedItem ? 'update' : 'create'} ${type.toLowerCase()}. Please try again.`);
      console.error(`Error with ${type.toLowerCase()}:`, err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    try {
      switch (type.toLowerCase()) {
        case 'author':
          await bookMetaDataService.deleteAuthor(selectedItem.id);
          break;
        case 'publisher':
          await bookMetaDataService.deletePublisher(selectedItem.id);
          break;
        case 'genre':
          await bookMetaDataService.deleteGenre(selectedItem.id);
          break;
      }
      setItems(prev => prev.filter(item => item.id !== selectedItem.id));
      setIsDeleteModalOpen(false);
      setError(null);
    } catch (err) {
      setError(`Failed to delete ${type.toLowerCase()}. Please try again.`);
      console.error(`Error deleting ${type.toLowerCase()}:`, err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          {type}s Management
        </h2>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New {type}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <BookMetadataCard
              key={item.id}
              item={item}
              type={type}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <BookMetadataForm
          item={selectedItem}
          type={type}
          onCancel={() => setIsFormOpen(false)}
          onSuccess={handleFormSubmit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        item={selectedItem}
        type={type}
      />
      )}
    </div>
  );
};

export default BookMetadataSection;