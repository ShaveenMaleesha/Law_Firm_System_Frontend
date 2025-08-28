import api from './api';

export interface CreateAppointmentData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  client_id?: string; // Optional - for authenticated users
}

export interface Appointment {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  client_id?: string;
  lawyer_id?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentResponse {
  message: string;
  appointment: Appointment;
}

class AppointmentService {
  // Create appointment (public - no authentication required)
  async createAppointment(data: CreateAppointmentData): Promise<CreateAppointmentResponse> {
    // This endpoint doesn't require authentication, so we'll make a direct call
    // without using the authenticated api instance
    const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create appointment');
    }

    return response.json();
  }

  // Get all appointments (authenticated)
  async getAllAppointments(params?: {
    status?: string;
    lawyer_id?: string;
    client_id?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.lawyer_id) queryParams.append('lawyer_id', params.lawyer_id);
    if (params?.client_id) queryParams.append('client_id', params.client_id);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await api.get(`/appointments?${queryParams.toString()}`);
    return response.data;
  }

  // Get appointment by ID
  async getAppointmentById(id: string): Promise<Appointment> {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  }

  // Get pending appointments (admin only)
  async getPendingAppointments(): Promise<any> {
    const response = await api.get('/appointments/pending');
    return response.data;
  }

  // Assign lawyer and approve appointment (admin only)
  async assignLawyerAndApprove(id: string, lawyerId: string, adminNotes?: string): Promise<any> {
    const response = await api.put(`/appointments/${id}/assign-lawyer`, {
      lawyer_id: lawyerId,
      adminNotes
    });
    return response.data;
  }

  // Reject appointment (admin only)
  async rejectAppointment(id: string, adminNotes?: string): Promise<any> {
    const response = await api.put(`/appointments/${id}/reject`, {
      adminNotes
    });
    return response.data;
  }
 
  // Update appointment status (admin only)
  async updateAppointmentStatus(id: string, status: string, adminNotes?: string): Promise<any> {
    const response = await api.put(`/appointments/${id}/status`, {
      status,
      adminNotes
    });
    return response.data;
  }

  // Update appointment (authenticated)
  async updateAppointment(id: string, data: Partial<CreateAppointmentData>): Promise<any> {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
  }

  // Delete appointment (admin only)
  async deleteAppointment(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  }

  // Get appointments by lawyer (authenticated)
  async getAppointmentsByLawyer(lawyerId: string, status?: string): Promise<any> {
    const queryParams = status ? `?status=${status}` : '';
    const response = await api.get(`/appointments/lawyer/${lawyerId}${queryParams}`);
    return response.data;
  }

  // Get appointments by client (authenticated)
  async getAppointmentsByClient(clientId: string, status?: string): Promise<any> {
    const queryParams = status ? `?status=${status}` : '';
    const response = await api.get(`/appointments/client/${clientId}${queryParams}`);
    return response.data;
  }
}

export default new AppointmentService();
