import React, { useState, useEffect } from "react";
import clientService, { ClientDetailsResponse } from "../../../services/clientService";

interface ClientList {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  username: string;
}

interface ClientListPopUpProps {
  client: ClientList;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

const ClientListPopUp: React.FC<ClientListPopUpProps> = ({
  client,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [editableClient, setEditableClient] = useState<ClientDetailsResponse | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch detailed client information when popup opens
  useEffect(() => {
    if (isOpen && client.id) {
      fetchClientDetails();
    }
  }, [isOpen, client.id]);

  const fetchClientDetails = async () => {
    try {
      setIsLoading(true);
      setError('');
      const clientDetails = await clientService.getClientById(client.id);
      setEditableClient(clientDetails);
    } catch (err: any) {
      console.error("Error fetching client details:", err);
      setError(err.response?.data?.message || 'Failed to fetch client details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ClientDetailsResponse, value: string) => {
    if (editableClient) {
      setEditableClient({
        ...editableClient,
        [field]: value,
      });
    }
  };

  const handleSave = async () => {
    if (!editableClient) return;

    try {
      setIsSaving(true);
      setError('');
      
      await clientService.updateClient(editableClient._id, {
        name: editableClient.name,
        username: editableClient.username,
        email: editableClient.email,
        contactNo: editableClient.contactNo,
        address: editableClient.address,
      });

      if (onUpdate) {
        onUpdate();
      }
      onClose();
    } catch (err: any) {
      console.error("Error updating client:", err);
      setError(err.response?.data?.message || 'Failed to update client');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editableClient || !window.confirm('Are you sure you want to delete this client?')) {
      return;
    }

    try {
      setIsDeleting(true);
      setError('');
      
      await clientService.deleteClient(editableClient._id);

      if (onUpdate) {
        onUpdate();
      }
      onClose();
    } catch (err: any) {
      console.error("Error deleting client:", err);
      setError(err.response?.data?.message || 'Failed to delete client');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

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
            Client Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            &#10005;
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading client details...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-red-500 mb-4">⚠️ Error loading client details</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchClientDetails}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : editableClient ? (
          <>
            {/* Form Fields */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <EditableDetailItem 
                label="Name" 
                value={editableClient.name}
                onChange={(value) => handleInputChange('name', value)}
              />
              <EditableDetailItem 
                label="Username" 
                value={editableClient.username}
                onChange={(value) => handleInputChange('username', value)}
              />
              <EditableDetailItem 
                label="Contact No." 
                value={editableClient.contactNo}
                onChange={(value) => handleInputChange('contactNo', value)}
              />
              <EditableDetailItem 
                label="Email" 
                value={editableClient.email}
                onChange={(value) => handleInputChange('email', value)}
                fullWidth
              />
              <EditableDetailItem 
                label="Address" 
                value={editableClient.address}
                onChange={(value) => handleInputChange('address', value)}
                fullWidth
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-between border-t pt-4">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
                onClick={handleDelete}
                disabled={isDeleting || isSaving}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <div className="flex space-x-2">
                <button 
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400" 
                  onClick={onClose}
                  disabled={isSaving || isDeleting}
                >
                  Cancel
                </button>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                  onClick={handleSave}
                  disabled={isSaving || isDeleting}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

// Helper component for displaying editable label-value pairs
const EditableDetailItem = ({
  label,
  value,
  onChange,
  fullWidth = false,
}: {
  label: string;
  value: string;
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

export default ClientListPopUp;
