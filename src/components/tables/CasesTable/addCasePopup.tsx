import React, { useState, useEffect } from "react";
import caseService, { CreateCaseData } from "../../../services/caseService";
import lawyerService, { Lawyer } from "../../../services/lawyerService";
import clientService, { Client } from "../../../services/clientService";

interface AddCasePopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onCaseCreated: () => void;
}

const AddCasePopUp: React.FC<AddCasePopUpProps> = ({
  isOpen,
  onClose,
  onCaseCreated,
}) => {
  // Form state
  const [formData, setFormData] = useState<CreateCaseData>({
    caseName: '',
    fileNumber: '',
    client_id: '',
    lawyer_id: '',
    description: '',
    caseType: '',
    priority: 'medium',
    startDate: new Date().toISOString().split('T')[0], // Today's date
  });

  // Selection state
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  // UI state
  const [isClientListOpen, setIsClientListOpen] = useState(false);
  const [isLawyerListOpen, setIsLawyerListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        caseName: '',
        fileNumber: '',
        client_id: '',
        lawyer_id: '',
        description: '',
        caseType: '',
        priority: 'medium',
        startDate: new Date().toISOString().split('T')[0],
      });
      setSelectedClient(null);
      setSelectedLawyer(null);
      setError('');
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setFormData(prev => ({
      ...prev,
      client_id: client._id
    }));
    setIsClientListOpen(false);
  };

  const handleLawyerSelect = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setFormData(prev => ({
      ...prev,
      lawyer_id: lawyer._id
    }));
    setIsLawyerListOpen(false);
  };

  const validateForm = () => {
    if (!formData.caseName.trim()) {
      setError('Case name is required');
      return false;
    }
    if (!formData.fileNumber.trim()) {
      setError('File number is required');
      return false;
    }
    if (!formData.client_id) {
      setError('Please select a client');
      return false;
    }
    if (!formData.lawyer_id) {
      setError('Please select a lawyer');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.caseType.trim()) {
      setError('Case type is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await caseService.createCase(formData);
      
      onCaseCreated();
    } catch (err: any) {
      setError(err.message || 'Failed to create case');
    } finally {
      setIsLoading(false);
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
            Add New Case
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            &#10005;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Row 1: Case Name and File Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Case Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="caseName"
                value={formData.caseName}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter case name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                File Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fileNumber"
                value={formData.fileNumber}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter file number"
                required
              />
            </div>
          </div>

          {/* Row 2: Client and Lawyer Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedClient ? `${selectedClient.name} (${selectedClient.email})` : ''}
                  placeholder="Click to select client"
                  className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 cursor-pointer"
                  readOnly
                  onClick={() => setIsClientListOpen(true)}
                />
                <button
                  type="button"
                  onClick={() => setIsClientListOpen(true)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                >
                  Select
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lawyer <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedLawyer ? `${selectedLawyer.name} (${selectedLawyer.practiceArea})` : ''}
                  placeholder="Click to select lawyer"
                  className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 cursor-pointer"
                  readOnly
                  onClick={() => setIsLawyerListOpen(true)}
                />
                <button
                  type="button"
                  onClick={() => setIsLawyerListOpen(true)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                >
                  Select
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Case Type and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Case Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="caseType"
                value={formData.caseType}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="e.g., Criminal, Civil, Family, Corporate"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Row 4: Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 resize-none"
              placeholder="Enter case description..."
              required
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 text-sm rounded-md hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Case'}
            </button>
          </div>
        </form>
      </div>

      {/* Client List Popup */}
      {isClientListOpen && (
        <ClientListPopUp
          isOpen={isClientListOpen}
          onClose={() => setIsClientListOpen(false)}
          onSelect={handleClientSelect}
        />
      )}

      {/* Lawyer List Popup */}
      {isLawyerListOpen && (
        <LawyerListPopUp
          isOpen={isLawyerListOpen}
          onClose={() => setIsLawyerListOpen(false)}
          onSelect={handleLawyerSelect}
        />
      )}
    </div>
  );
};

// Client List Popup Component
interface ClientListPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (client: Client) => void;
}

const ClientListPopUp: React.FC<ClientListPopUpProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchClients();
    }
  }, [isOpen]);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await clientService.getAllClients();
      setClients(response.clients || []);
    } catch (err: any) {
      console.error("Error fetching clients:", err);
      setError('Failed to load clients');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-opacity-60"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden p-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Select Client
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            &#10005;
          </button>
        </div>

        {/* Search Box */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search by name, email, or username"
            className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Loading clients...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-red-500 mb-2 text-sm">⚠️ {error}</div>
            <button
              onClick={fetchClients}
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          /* Client Table */
          <div className="mt-3 max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No clients found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr
                      key={client._id}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => onSelect(client)}
                    >
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {client.name}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {client.email}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {client.contactNo}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Lawyer List Popup Component
interface LawyerListPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (lawyer: Lawyer) => void;
}

const LawyerListPopUp: React.FC<LawyerListPopUpProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchLawyers();
    }
  }, [isOpen]);

  const fetchLawyers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await lawyerService.getAllLawyers();
      setLawyers(response.lawyers || []);
    } catch (err: any) {
      console.error("Error fetching lawyers:", err);
      setError('Failed to load lawyers');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.practiceArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-opacity-60"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden p-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Select Lawyer
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            &#10005;
          </button>
        </div>

        {/* Search Box */}
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search by name, email, or practice area"
            className="w-full border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Loading lawyers...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-red-500 mb-2 text-sm">⚠️ {error}</div>
            <button
              onClick={fetchLawyers}
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          /* Lawyer Table */
          <div className="mt-3 max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Practice Area
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLawyers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No lawyers found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredLawyers.map((lawyer) => (
                    <tr
                      key={lawyer._id}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => onSelect(lawyer)}
                    >
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {lawyer.name}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {lawyer.practiceArea}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {lawyer.email}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCasePopUp;
