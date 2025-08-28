import React, { useState, useEffect } from "react";
import appointmentService from "../../../services/appointmentService";
import lawyerService, { Lawyer } from "../../../services/lawyerService";

interface AppointmentList {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

interface AppointmentPopUpProps {
  appointment: AppointmentList;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

const AppointmentPopUp: React.FC<AppointmentPopUpProps> = ({
  appointment,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [isLawyerListOpen, setIsLawyerListOpen] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async () => {
    if (!selectedLawyer) {
      setError('Please select a lawyer before approving the appointment');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await appointmentService.assignLawyerAndApprove(
        appointment.id,
        selectedLawyer._id,
        adminNotes
      );

      if (onUpdate) {
        onUpdate();
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to approve appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!adminNotes.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await appointmentService.rejectAppointment(appointment.id, adminNotes);

      if (onUpdate) {
        onUpdate();
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to reject appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignToLawyer = () => {
    setIsLawyerListOpen(true);
  };

  const handleLawyerSelect = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setIsLawyerListOpen(false);
  };

  const isPending = appointment.status === 'pending';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-opacity-60"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Appointment Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            &#10005;
          </button>
        </div>

        {/* Status Badge */}
        <div className="mt-3 flex items-center gap-3">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
            appointment.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
            appointment.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
            'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
          }`}>
            Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>

          {/* Assign to Lawyer Button - Only show if pending */}
          {isPending && (
            <button
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
              onClick={handleAssignToLawyer}
            >
              {selectedLawyer ? 'Change Lawyer' : 'Select Lawyer'}
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DetailItem label="Client Name" value={appointment.clientName} />
          <DetailItem label="Phone" value={appointment.clientPhone} />
          <DetailItem label="Email" value={appointment.clientEmail} fullWidth />
          <DetailItem label="Subject/Practice Area" value={appointment.subject} fullWidth />
          <DetailItem label="Date" value={new Date(appointment.date).toLocaleDateString()} />
          <DetailItem label="Time" value={appointment.time} />
          {selectedLawyer && (
            <DetailItem 
              label="Assigned Lawyer" 
              value={`${selectedLawyer.name} (${selectedLawyer.practiceArea})`} 
              fullWidth 
            />
          )}
        </div>

        {/* Description */}
        <div className="mt-3">
          <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
            Description
          </span>
          <textarea
            className="w-full h-20 border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white resize-none"
            value={appointment.description}
            readOnly
          />
        </div>

        {/* Admin Notes - Only show for pending appointments */}
        {isPending && (
          <div className="mt-3">
            <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">
              Admin Notes {appointment.status === 'pending' && <span className="text-red-500">*</span>}
            </span>
            <textarea
              className="w-full h-16 border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white resize-none"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes for approval/rejection..."
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Footer Buttons - Only show admin actions for pending appointments */}
        <div className="mt-4 flex justify-between border-t pt-3">
          {isPending ? (
            <>
              <button 
                className="bg-red-500 text-white px-3 py-2 text-sm rounded-md hover:bg-red-600 disabled:opacity-50"
                onClick={handleReject}
                disabled={isLoading}
              >
                {isLoading ? 'Rejecting...' : 'Reject'}
              </button>
              <div className="flex space-x-2">
                <button 
                  className="bg-gray-300 text-gray-800 px-3 py-2 text-sm rounded-md hover:bg-gray-400" 
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  className="bg-green-500 text-white px-3 py-2 text-sm rounded-md hover:bg-green-600 disabled:opacity-50"
                  onClick={handleApprove}
                  disabled={isLoading || !selectedLawyer}
                >
                  {isLoading ? 'Approving...' : 'Approve & Assign'}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button 
                className="bg-gray-300 text-gray-800 px-3 py-2 text-sm rounded-md hover:bg-gray-400" 
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

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

// Helper component for displaying label-value pairs
const DetailItem = ({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string | number;
  fullWidth?: boolean;
}) => (
  <div className={`flex flex-col ${fullWidth ? "sm:col-span-2" : ""}`}>
    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
    <input
      className="border rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white bg-gray-50"
      value={value}
      readOnly
    />
  </div>
);

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
    lawyer.practiceArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-opacity-60"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden p-4">
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
            placeholder="Search by name or practice area"
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

export default AppointmentPopUp;
