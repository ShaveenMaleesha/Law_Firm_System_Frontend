import api from './api';

export interface Client {
  _id: string;
  name: string;
  username: string;
  email: string;
  contactNo: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientsResponse {
  message: string;
  clients: Client[];
  totalClients: number;
  currentPage: number;
  totalPages: number;
}

export interface ClientDetailsResponse {
  _id: string;
  name: string;
  username: string;
  email: string;
  contactNo: string;
  address: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientData {
  name: string;
  username: string;
  password: string;
  email: string;
  contactNo: string;
  address: string;
}

export interface CreateClientResponse {
  message: string;
  client: Client;
}

class ClientService {
  // Get all clients (admin only)
  async getAllClients(params?: {
    email?: string;
    name?: string;
    username?: string;
    contactNo?: string;
    page?: number;
    limit?: number;
  }): Promise<ClientsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.email) queryParams.append('email', params.email);
    if (params?.name) queryParams.append('name', params.name);
    if (params?.username) queryParams.append('username', params.username);
    if (params?.contactNo) queryParams.append('contactNo', params.contactNo);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await api.get(`/clients?${queryParams.toString()}`);
    return response.data;
  }

  // Get client by ID (admin only)
  async getClientById(id: string): Promise<ClientDetailsResponse> {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  }

  // Get client with statistics (admin only)
  async getClientWithStats(id: string): Promise<any> {
    const response = await api.get(`/clients/${id}/stats`);
    return response.data;
  }

  // Update client (admin only)
  async updateClient(id: string, data: Partial<Client>): Promise<any> {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  }

  // Delete client (admin only)
  async deleteClient(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  }

  // Get clients for selection (authenticated users)
  async getClientsForSelection(): Promise<any> {
    const response = await api.get('/clients/selection');
    return response.data;
  }

  // Search clients (admin only)
  async searchClients(query: string): Promise<any> {
    const response = await api.get(`/clients/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  // Get client statistics (admin only)
  async getClientStatistics(): Promise<any> {
    const response = await api.get('/clients/statistics');
    return response.data;
  }

  // Create client (admin only)
  async createClient(data: CreateClientData): Promise<CreateClientResponse> {
    const response = await api.post('/clients', data);
    return response.data;
  }

  // Get current client's own details (client only)
  async getMyDetails(): Promise<{ message: string; client: ClientDetailsResponse }> {
    const response = await api.get('/clients/me');
    return response.data;
  }
}

export default new ClientService();
