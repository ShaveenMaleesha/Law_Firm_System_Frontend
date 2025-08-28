import api from './api';

export interface Case {
  _id: string;
  caseName: string;
  fileNumber: string;
  client_id: {
    _id: string;
    name: string;
    email: string;
    username: string;
  };
  lawyer_id: {
    _id: string;
    name: string;
    email: string;
    practiceArea: string;
  };
  description: string;
  caseType: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'closed' | 'pending' | 'on-hold';
  startDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCaseData {
  caseName: string;
  fileNumber: string;
  client_id: string;
  lawyer_id: string;
  description: string;
  caseType: string;
  priority?: 'low' | 'medium' | 'high';
  startDate?: string;
}

export interface CasesResponse {
  message: string;
  cases: Case[];
  totalCases: number;
  currentPage: number;
  totalPages: number;
}

export interface CreateCaseResponse {
  message: string;
  case: Case;
}

class CaseService {
  // Create case (admin only)
  async createCase(data: CreateCaseData): Promise<CreateCaseResponse> {
    const response = await api.post('/cases', data);
    return response.data;
  }

  // Get all cases with filtering and pagination
  async getAllCases(params?: {
    status?: string;
    lawyer_id?: string;
    client_id?: string;
    priority?: string;
    caseType?: string;
    page?: number;
    limit?: number;
  }): Promise<CasesResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.lawyer_id) queryParams.append('lawyer_id', params.lawyer_id);
    if (params?.client_id) queryParams.append('client_id', params.client_id);
    if (params?.priority) queryParams.append('priority', params.priority);
    if (params?.caseType) queryParams.append('caseType', params.caseType);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await api.get(`/cases?${queryParams.toString()}`);
    return response.data;
  }

  // Get case by ID
  async getCaseById(id: string): Promise<Case> {
    const response = await api.get(`/cases/${id}`);
    return response.data;
  }

  // Update case (admin only)
  async updateCase(id: string, data: Partial<CreateCaseData>): Promise<any> {
    const response = await api.put(`/cases/${id}`, data);
    return response.data;
  }

  // Update case status (admin only)
  async updateCaseStatus(id: string, status: string): Promise<any> {
    const response = await api.put(`/cases/${id}/status`, { status });
    return response.data;
  }

  // Delete case (admin only)
  async deleteCase(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/cases/${id}`);
    return response.data;
  }

  // Get cases by lawyer
  async getCasesByLawyer(lawyerId: string, status?: string): Promise<any> {
    const queryParams = status ? `?status=${status}` : '';
    const response = await api.get(`/cases/lawyer/${lawyerId}${queryParams}`);
    return response.data;
  }

  // Get cases by client
  async getCasesByClient(clientId: string, status?: string): Promise<any> {
    const queryParams = status ? `?status=${status}` : '';
    const response = await api.get(`/cases/client/${clientId}${queryParams}`);
    return response.data;
  }

  // Get case statistics (admin only)
  async getCaseStatistics(): Promise<any> {
    const response = await api.get('/cases/statistics');
    return response.data;
  }
}

export default new CaseService();
