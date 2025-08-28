import React, { useState, useEffect } from "react";
import lawyerService, { LawyerDetailsResponse } from "../../../services/lawyerService";

interface LowyerList {
  id: string;
  email: string;
  practiceArea: string;
  address: string;
  contactNumber: string;
  name: string;
}

interface LowyerListPopUpProps {
  lowyer: LowyerList;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

const LowyerListPopUp: React.FC<LowyerListPopUpProps> = ({
  lowyer,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [editableLowyer, setEditableLowyer] = useState<LawyerDetailsResponse | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch detailed lawyer information when popup opens
  useEffect(() => {
    if (isOpen && lowyer.id) {
      fetchLawyerDetails();
    }
  }, [isOpen, lowyer.id]);

  const fetchLawyerDetails = async () => {
    try {
      setIsLoading(true);
      setError('');
      const lawyerDetails = await lawyerService.getLawyerById(lowyer.id);
      setEditableLowyer(lawyerDetails);
    } catch (err: any) {
      console.error("Error fetching lawyer details:", err);
      setError(err.response?.data?.message || 'Failed to fetch lawyer details');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleChange = (field: keyof LawyerDetailsResponse, value: string) => {
    if (!editableLowyer) return;
    setEditableLowyer((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  const handleSave = async () => {
    if (!editableLowyer) return;
    
    setIsSaving(true);
    try {
      const updateData = {
        name: editableLowyer.name,
        email: editableLowyer.email,
        practiceArea: editableLowyer.practiceArea,
        address: editableLowyer.address,
        contactNo: editableLowyer.contactNo,
      };
      
      await lawyerService.updateLawyer(editableLowyer._id, updateData);
      alert("Lawyer details updated successfully!");
      if (onUpdate) {
        onUpdate();
      }
      onClose();
    } catch (error: any) {
      console.error("Error updating lawyer details:", error);
      alert(error.response?.data?.message || "Failed to update lawyer details.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editableLowyer) return;
    
    if (window.confirm("Are you sure you want to delete this lawyer?")) {
      try {
        await lawyerService.deleteLawyer(editableLowyer._id);
        alert("Lawyer deleted successfully!");
        if (onUpdate) {
          onUpdate();
        }
        onClose();
      } catch (error: any) {
        console.error("Error deleting lawyer:", error);
        alert(error.response?.data?.message || "Failed to delete lawyer.");
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-60" onClick={onClose}></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 mx-4">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading lawyer details...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-60" onClick={onClose}></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 mx-4">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-red-500 mb-4">⚠️ Error loading lawyer details</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <div className="flex gap-2">
              <button
                onClick={fetchLawyerDetails}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!editableLowyer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-opacity-60"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Lawyer Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            &#10005;
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <DetailItem
            label="Name"
            value={editableLowyer.name}
            onChange={(value) => handleChange("name", value)}
          />
          <DetailItem
            label="Contact No."
            value={editableLowyer.contactNo}
            onChange={(value) => handleChange("contactNo", value)}
          />
          <DetailItem
            label="Email"
            value={editableLowyer.email}
            onChange={(value) => handleChange("email", value)}
            fullWidth
          />
          <DetailItem
            label="Practice Area"
            value={editableLowyer.practiceArea}
            onChange={(value) => handleChange("practiceArea", value)}
            fullWidth
          />
          <DetailItem
            label="Address"
            value={editableLowyer.address}
            onChange={(value) => handleChange("address", value)}
            fullWidth
          />
          <div className="col-span-2 mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Created:</strong> {new Date(editableLowyer.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Last Updated:</strong> {new Date(editableLowyer.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-between border-t pt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
          <div className="flex space-x-2">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying label-value pairs
const DetailItem = ({
  label,
  value,
  onChange,
  fullWidth = false,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}) => (
  <div className={`flex flex-col ${fullWidth ? "col-span-2" : ""}`}>
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <input
      className="border rounded-md p-2 mt-1 dark:bg-gray-700 dark:text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default LowyerListPopUp;
