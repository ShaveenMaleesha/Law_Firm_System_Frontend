import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import AddClientPopUp from "./addclientPopup";
import ClientDetailsPopUp from "./clientDetails";
import clientService, { Client } from "../../../services/clientService";

interface ClientList {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  username: string;
}

export default function ClientListTable() {
  const [selectedClient, setSelectedClient] = useState<ClientList | null>(null);
  const [isDetailsPopUpOpen, setIsDetailsPopUpOpen] = useState(false);
  const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
  const [clientList, setClientList] = useState<ClientList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch clients from API
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await clientService.getAllClients();
      
      // Transform API response to match component interface
      const formattedData: ClientList[] = response.clients.map((client: Client) => ({
        id: client._id,
        name: client.name,
        email: client.email,
        username: client.username,
        address: client.address,
        contactNumber: client.contactNo,
      }));
      
      setClientList(formattedData);
    } catch (err: any) {
      console.error("Error fetching clients:", err);
      setError(err.response?.data?.message || 'Failed to fetch clients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (client: ClientList) => {
    setSelectedClient(client);
    setIsDetailsPopUpOpen(true);
  };

  const handleCloseDetailsPopUp = () => {
    setIsDetailsPopUpOpen(false);
    setSelectedClient(null);
  };

  const handleAddClient = () => {
    setIsAddPopUpOpen(true);
  };

  const handleCloseAddPopUp = () => {
    setIsAddPopUpOpen(false);
  };

  const handleClientRegistered = () => {
    // Refresh the client list when a client is successfully registered
    console.log('Client registered successfully!');
    fetchClients();
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading clients...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 mb-4">⚠️ Error loading clients</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchClients}
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
          onClick={handleAddClient}
        >
          Register New Client
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
                  Contact No
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Username
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
              {clientList.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="col-span-6">
                      No clients registered yet. Click "Register New Client" to add the first client.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                clientList.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {client.name}
                          </span>
                        </div> 
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {client.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {client.contactNumber}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {client.username}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {client.address}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <button
                        className="text-blue-500 hover:underline ml-2"
                        onClick={() => handleViewDetails(client)}
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
      {selectedClient && (
        <ClientDetailsPopUp
          client={selectedClient}
          isOpen={isDetailsPopUpOpen}
          onClose={handleCloseDetailsPopUp}
          onUpdate={fetchClients}
        />
      )}
      <AddClientPopUp
        isOpen={isAddPopUpOpen}
        onClose={handleCloseAddPopUp}
        onSuccess={handleClientRegistered}
      />
    </div>
  );
}
