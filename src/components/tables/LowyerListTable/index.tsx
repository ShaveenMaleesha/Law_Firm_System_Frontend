import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import AppointmentPopUp from "./lowyerDetailsPopup";
import AddLowyerPopUp from "./addLowyerPopup";
import lawyerService, { Lawyer } from "../../../services/lawyerService";

interface LowyerList {
  id: string;
  email: string;
  practiceArea: string;
  address: string;
  contactNumber: string;
  name: string;
}

export default function LowyerListTable() {
  const [selectedAppointment, setSelectedAppointment] = useState<LowyerList | null>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
  const [lowyerList, setLowyerList] = useState<LowyerList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch lawyers from API
  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await lawyerService.getAllLawyers();
      
      // Transform API response to match component interface
      const formattedData: LowyerList[] = response.lawyers.map((lawyer: Lawyer) => ({
        id: lawyer._id,
        name: lawyer.name,
        email: lawyer.email,
        practiceArea: lawyer.practiceArea,
        address: lawyer.address,
        contactNumber: lawyer.contactNo,
      }));
      
      setLowyerList(formattedData);
    } catch (err: any) {
      console.error("Error fetching lawyers:", err);
      setError(err.response?.data?.message || 'Failed to fetch lawyers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (appointment: LowyerList) => {
    setSelectedAppointment(appointment);
    setIsPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
    setSelectedAppointment(null);
  };

  const handleAddLowyer = () => {
    setIsAddPopUpOpen(true);
  };

  const handleCloseAddPopUp = () => {
    setIsAddPopUpOpen(false);
  };

  const handleLawyerRegistered = () => {
    // Refresh the lawyer list when a lawyer is successfully registered
    console.log('Lawyer registered successfully!');
    fetchLawyers();
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading lawyers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 mb-4">⚠️ Error loading lawyers</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchLawyers}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex justify-end p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddLowyer}
        >
          Register New Lawyer
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Contact Number
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Practice Area
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Address
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {lowyerList.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="col-span-6">
                      No lawyers registered yet. Click "Register New Lawyer" to add the first lawyer.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                lowyerList.map((lawyer) => (
                  <TableRow key={lawyer.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {lawyer.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {lawyer.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {lawyer.contactNumber}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {lawyer.practiceArea}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {lawyer.address}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <button
                        className="text-blue-500 hover:underline ml-2"
                        onClick={() => handleViewDetails(lawyer)}
                      >
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {selectedAppointment && (
        <AppointmentPopUp
          lowyer={selectedAppointment}
          isOpen={isPopUpOpen}
          onClose={handleClosePopUp}
          onUpdate={fetchLawyers}
        />
      )}
      <AddLowyerPopUp
        isOpen={isAddPopUpOpen}
        onClose={handleCloseAddPopUp}
        onSuccess={handleLawyerRegistered}
      />
    </div>
  );
}
