import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls

interface BlogDetail {
  id: string; // Updated to match the API's "_id" field
  name?: string; // Optional, as not all API responses include "name"
  email?: string; // Optional, as not all API responses include "email"
  blogTitle: string; // Mapped from "topic"
  blogContent: string; // Mapped from "content"
  approved: boolean;
  timestamp: string;
}

interface BlogDetailsPopUpProps {
  blogDetail: BlogDetail;
  isOpen: boolean;
  onClose: () => void;
}

const BlogDetailsPopUp: React.FC<BlogDetailsPopUpProps> = ({
  blogDetail,
  isOpen,
  onClose,
}) => {
  const [editableBlog, setEditableBlog] = useState(blogDetail);
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableBlog({ ...editableBlog, [name]: value });
  };

  const updateApprovalStatus = async (approved: boolean) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/blogs/${editableBlog.id}`, {
        content: editableBlog.blogContent,
        topic: editableBlog.blogTitle,
        practiceArea: "Business Law", // Assuming a default value for practiceArea
        email: editableBlog.email,
        name: editableBlog.name,
        approved,
      });
      setEditableBlog({ ...editableBlog, approved });
      onClose(); // Close the modal after successful update
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Failed to update blog approval status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-60" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{editableBlog.blogTitle}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{editableBlog.name} ({editableBlog.email})</p>

        {/* Image */}
        <div className="w-full flex justify-center mb-4">
          <img src="https://via.placeholder.com/400" alt="Blog Image" className="w-80 h-auto rounded-md" />
        </div>

        {/* Blog Content */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{editableBlog.blogContent}</p>

        {/* Footer Buttons */}
        <div className="border-t pt-4 flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            onClick={() => updateApprovalStatus(false)}
            disabled={isLoading}
          >
            Reject
          </button>
          <button
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => updateApprovalStatus(true)}
            disabled={isLoading}
          >
            Approved
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPopUp;