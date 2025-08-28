import React, { useState, useEffect } from "react";
import caseService, { Case } from "../../../services/caseService";

interface CasesListPopUpProps {
  caseDetail: Case;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

const CasesListPopUp: React.FC<CasesListPopUpProps> = ({
  caseDetail,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [editableCase, setEditableCase] = useState({
    caseName: caseDetail.caseName,
    fileNumber: caseDetail.fileNumber,
    description: caseDetail.description,
    caseType: caseDetail.caseType,
    priority: caseDetail.priority,
    startDate: caseDetail.startDate ? new Date(caseDetail.startDate).toISOString().split('T')[0] : '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen && caseDetail) {
      setEditableCase({
        caseName: caseDetail.caseName,
        fileNumber: caseDetail.fileNumber,
        description: caseDetail.description,
        caseType: caseDetail.caseType,
        priority: caseDetail.priority,
        startDate: caseDetail.startDate ? new Date(caseDetail.startDate).toISOString().split('T')[0] : '',
      });
      setError('');
      setIsEditing(false);
    }
  }, [isOpen, caseDetail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableCase(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!editableCase.caseName.trim()) {
      setError('Case name is required');
      return false;
    }
    if (!editableCase.fileNumber.trim()) {
      setError('File number is required');
      return false;
    }
    if (!editableCase.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!editableCase.caseType.trim()) {
      setError('Case type is required');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await caseService.updateCase(caseDetail._id, {
        caseName: editableCase.caseName,
        fileNumber: editableCase.fileNumber,
        client_id: caseDetail.client_id._id,
        lawyer_id: caseDetail.lawyer_id._id,
        description: editableCase.description,
        caseType: editableCase.caseType,
        priority: editableCase.priority,
        startDate: editableCase.startDate,
      });
      
      onUpdate();
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update case');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setIsLoading(true);
      setError('');
      
      await caseService.updateCaseStatus(caseDetail._id, newStatus);
      
      onUpdate();
    } catch (err: any) {
      setError(err.message || 'Failed to update case status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await caseService.deleteCase(caseDetail._id);
      
      onDelete();
    } catch (err: any) {
      setError(err.message || 'Failed to delete case');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'on-hold':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-opacity-60"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Case Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            &#10005;
          </button>
        </div>

        {/* Status and Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(caseDetail.status)}`}>
            Status: {caseDetail.status.charAt(0).toUpperCase() + caseDetail.status.slice(1)}
          </span>
          
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
                disabled={isLoading}
              >
                Edit Case
              </button>
              
              {/* Status Update Buttons */}
              {caseDetail.status === 'pending' && (
                <button
                  onClick={() => handleStatusUpdate('active')}
                  className="bg-green-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600"
                  disabled={isLoading}
                >
                  Activate
                </button>
              )}
              
              {caseDetail.status === 'active' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate('on-hold')}
                    className="bg-orange-500 text-white px-3 py-1 text-sm rounded-md hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    Put On Hold
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('closed')}
                    className="bg-gray-500 text-white px-3 py-1 text-sm rounded-md hover:bg-gray-600"
                    disabled={isLoading}
                  >
                    Close Case
                  </button>
                </>
              )}
              
              {caseDetail.status === 'on-hold' && (
                <button
                  onClick={() => handleStatusUpdate('active')}
                  className="bg-green-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600"
                  disabled={isLoading}
                >
                  Resume
                </button>
              )}
            </>
          )}
        </div>

        {/* Form */}
        <div className="mt-4 space-y-4">
          {/* Row 1: Case Name and File Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem 
              label="Case Name" 
              name="caseName" 
              value={editableCase.caseName} 
              onChange={handleChange} 
              isEditing={isEditing}
            />
            <DetailItem 
              label="File Number" 
              name="fileNumber" 
              value={editableCase.fileNumber} 
              onChange={handleChange} 
              isEditing={isEditing}
            />
          </div>

          {/* Row 2: Client and Lawyer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client
              </label>
              <input
                type="text"
                value={`${caseDetail.client_id.name} (${caseDetail.client_id.email})`}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white bg-gray-50"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lawyer
              </label>
              <input
                type="text"
                value={`${caseDetail.lawyer_id.name} (${caseDetail.lawyer_id.practiceArea})`}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white bg-gray-50"
                readOnly
              />
            </div>
          </div>

          {/* Row 3: Case Type and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem 
              label="Case Type" 
              name="caseType" 
              value={editableCase.caseType} 
              onChange={handleChange} 
              isEditing={isEditing}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              {isEditing ? (
                <select
                  name="priority"
                  value={editableCase.priority}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={editableCase.priority.charAt(0).toUpperCase() + editableCase.priority.slice(1)}
                  className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white bg-gray-50"
                  readOnly
                />
              )}
            </div>
          </div>

          {/* Row 4: Start Date and Created Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="startDate"
                  value={editableCase.startDate}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              ) : (
                <input
                  type="text"
                  value={editableCase.startDate ? new Date(editableCase.startDate).toLocaleDateString() : 'Not set'}
                  className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white bg-gray-50"
                  readOnly
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Created Date
              </label>
              <input
                type="text"
                value={new Date(caseDetail.createdAt).toLocaleDateString()}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white bg-gray-50"
                readOnly
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            {isEditing ? (
              <textarea
                name="description"
                value={editableCase.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 resize-none"
              />
            ) : (
              <textarea
                value={editableCase.description}
                rows={4}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white bg-gray-50 resize-none"
                readOnly
              />
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-between pt-4 border-t">
            {/* Delete Button (left side) */}
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete Case'}
            </button>

            {/* Action Buttons (right side) */}
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 text-sm rounded-md hover:bg-gray-400"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-800 px-4 py-2 text-sm rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for displaying label-value pairs
const DetailItem = ({
  label,
  name,
  value,
  onChange,
  isEditing = false,
}: {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white ${
        isEditing ? 'dark:border-gray-600' : 'bg-gray-50'
      }`}
      readOnly={!isEditing}
    />
  </div>
);

export default CasesListPopUp;
