import React, { useState, useEffect } from "react";
import AdminSideBar from "./components/AdminSideBar";
import TopNavAdmin from "./components/TopNavAdmin";
import List from "./components/AdminAnnouncement/List";
import Modal from "./components/AdminAnnouncement/Modal";
import DeleteModal from "./components/AdminAnnouncement/DeleteModal";
import Header from "./components/AdminAnnouncement/Header";
import announcementService from "../../services/announcementService";

const AdminAnnouncement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [deletingAnnouncement, setDeletingAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementService.getAllAnnouncements();
      setAnnouncements(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch announcements. Please try again later.");
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingAnnouncement) return;
    try {
      await announcementService.deleteAnnouncement(deletingAnnouncement.announcementId);
      setAnnouncements((prev) =>
        prev.filter((a) => a.announcementId !== deletingAnnouncement.announcementId)
      );
      setDeletingAnnouncement(null);
      setError(null);
    } catch (err) {
      setError("Failed to delete announcement. Please try again.");
      console.error("Error deleting announcement:", err);
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAnnouncement(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTitle = e.target.title.value.trim();
    const newContent = e.target.content.value.trim();
    const isActive = e.target.isActive.checked;

    const formatDateTime = (value) => {
      if (!value) return null;
      const localDate = new Date(value);
      return localDate.toISOString();
    };

    const displayStartTs = formatDateTime(e.target.startDateTime.value);
    const displayEndTs = formatDateTime(e.target.endDateTime.value);

    if (!newTitle || !newContent || !displayStartTs || !displayEndTs) return;

    try {
      if (editingAnnouncement) {
        const updatedAnnouncement = await announcementService.updateAnnouncement(
          editingAnnouncement.announcementId,
          {
            title: newTitle,
            description: newContent,
            isActive,
            displayStartTs,
            displayEndTs,
          }
        );
        setAnnouncements((prev) =>
          prev.map((a) =>
            a.announcementId === editingAnnouncement.announcementId
              ? updatedAnnouncement
              : a
          )
        );
      } else {
        const newAnnouncement = await announcementService.createAnnouncement({
          title: newTitle,
          description: newContent,
          isActive,
          displayStartTs,
          displayEndTs,
        });
        setAnnouncements((prev) => [newAnnouncement, ...prev]);
      }
      handleModalClose();
      setError(null);
    } catch (err) {
      setError(
        `Failed to ${editingAnnouncement ? "update" : "create"} announcement. Please try again.`
      );
      console.error("Error with announcement:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavAdmin />
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Header onAddClick={() => setIsModalOpen(true)} />

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <List
              announcements={announcements}
              onDelete={(a) => setDeletingAnnouncement(a)}
              onEdit={handleEdit}
            />
          )}
        </main>

        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          announcement={editingAnnouncement}
        />

        <DeleteModal
          item={deletingAnnouncement}
          onCancel={() => setDeletingAnnouncement(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default AdminAnnouncement;
