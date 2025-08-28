import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import CasesListPopUp from "./casesDetails";
import AddCasePopUp from "./addCasePopup";
import caseService, { Case } from "../../../services/caseService";

export default function CasesListTable() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isDetailsPopUpOpen, setIsDetailsPopUpOpen] = useState(false);
  const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await caseService.getAllCases();
      setCases(response.cases || []);
    } catch (err: any) {
      console.error("Error fetching cases:", err);
      setError('Failed to load cases');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (caseDetail: Case) => {
    setSelectedCase(caseDetail);
    setIsDetailsPopUpOpen(true);
  };

  const handleCloseDetailsPopUp = () => {
    setIsDetailsPopUpOpen(false);
    setSelectedCase(null);
  };

  const handleOpenAddPopUp = () => {
    setIsAddPopUpOpen(true);
  };

  const handleCloseAddPopUp = () => {
    setIsAddPopUpOpen(false);
  };

  const handleCaseCreated = () => {
    fetchCases(); // Refresh the cases list
    handleCloseAddPopUp();
  };

  const handleCaseUpdated = () => {
    fetchCases(); // Refresh the cases list
    handleCloseDetailsPopUp();
  };

  const handleCaseDeleted = () => {
    fetchCases(); // Refresh the cases list
    handleCloseDetailsPopUp();
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

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Add Case Button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-white/[0.05]">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cases Management</h2>
        <button
          onClick={handleOpenAddPopUp}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
        >
          Add New Case
        </button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Loading cases...</span>
            </div>
          ) : error ? (
            /* Error State */
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-red-500 mb-4 text-sm">⚠️ {error}</div>
              <button
                onClick={fetchCases}
                className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    File Number
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Case Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Client
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Lawyer
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Type
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Priority
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {cases.length === 0 ? (
                  <TableRow>
                    <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                      No cases found
                    </TableCell>
                    <TableCell className="px-4 py-8"> </TableCell>
                    <TableCell className="px-4 py-8"> </TableCell>
                    <TableCell className="px-4 py-8"> </TableCell>
                    <TableCell className="px-4 py-8"> </TableCell>
                    <TableCell className="px-4 py-8"> </TableCell>
                    <TableCell className="px-4 py-8"> </TableCell>
                    <TableCell className="px-4 py-8">
                      <button
                        onClick={handleOpenAddPopUp}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Add Case
                      </button>
                    </TableCell>
                  </TableRow>
                ) : (
                  cases.map((caseItem) => (
                    <TableRow key={caseItem._id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {caseItem.fileNumber}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="max-w-[200px] truncate" title={caseItem.caseName}>
                          {caseItem.caseName}
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {caseItem.client_id?.name || 'N/A'}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {caseItem.lawyer_id?.name || 'Unassigned'}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {caseItem.caseType}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-theme-sm">
                        <span className={`font-medium ${getPriorityColor(caseItem.priority)}`}>
                          {caseItem.priority.charAt(0).toUpperCase() + caseItem.priority.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <button
                          className="text-blue-500 hover:underline ml-2"
                          onClick={() => handleViewDetails(caseItem)}
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Case Details Popup */}
      {selectedCase && (
        <CasesListPopUp
          caseDetail={selectedCase}
          isOpen={isDetailsPopUpOpen}
          onClose={handleCloseDetailsPopUp}
          onUpdate={handleCaseUpdated}
          onDelete={handleCaseDeleted}
        />
      )}

      {/* Add Case Popup */}
      <AddCasePopUp
        isOpen={isAddPopUpOpen}
        onClose={handleCloseAddPopUp}
        onCaseCreated={handleCaseCreated}
      />
    </div>
  );
}
