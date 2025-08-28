import api from './api';

export interface Lawyer {
  _id: string;
  name: string;
  email: string;
  practiceArea: string;
  address: string;
  contactNo: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LawyersResponse {
  message: string;
  lawyers: Lawyer[];
  totalLawyers: number;
  currentPage: number;
  totalPages: number;
}

export interface LawyerStatistics {
  activeCases: number;
  approvedBlogs: number;
  onHoldCases: number;
  pendingCases: number;
  successfulCases: number;
  totalBlogs: number;
  totalCases: number;
  totalClients: number;
}

export interface LawyerDetailsResponse {
  _id: string;
  name: string;
  email: string;
  practiceArea: string[];
  address: string;
  contactNo: string;
  profilePicture?: string;
  blogIds: any[];
  caseIds: any[];
  statistics: LawyerStatistics;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LawyerMyDetailsApiResponse {
  message: string;
  lawyer: LawyerDetailsResponse;
}

class LawyerService {
  // Get all lawyers (admin only)
  async getAllLawyers(params?: {
    practiceArea?: string;
    email?: string;
    name?: string;
    page?: number;
    limit?: number;
  }): Promise<LawyersResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.practiceArea) queryParams.append('practiceArea', params.practiceArea);
    if (params?.email) queryParams.append('email', params.email);
    if (params?.name) queryParams.append('name', params.name);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await api.get(`/lawyers?${queryParams.toString()}`);
    return response.data;
  }

  // Get lawyer by ID (admin only)
  async getLawyerById(id: string): Promise<LawyerDetailsResponse> {
    const response = await api.get(`/lawyers/${id}`);
    return response.data;
  }

  // Get lawyer with statistics (admin only)
  async getLawyerWithStats(id: string): Promise<any> {
    const response = await api.get(`/lawyers/${id}/stats`);
    return response.data;
  }

  // Update lawyer (admin only)
  async updateLawyer(id: string, data: Partial<Lawyer>): Promise<any> {
    const response = await api.put(`/lawyers/${id}`, data);
    return response.data;
  }

  // Delete lawyer (admin only)
  async deleteLawyer(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/lawyers/${id}`);
    return response.data;
  }

  // Get lawyers for selection (public)
  async getLawyersForSelection(): Promise<any> {
    const response = await api.get('/lawyers/selection');
    return response.data;
  }

  // Get lawyers by practice area (public)
  async getLawyersByPracticeArea(practiceArea: string): Promise<any> {
    const response = await api.get(`/lawyers/practice-area/${practiceArea}`);
    return response.data;
  }

  // Get current lawyer's own details (lawyer only)
  async getMyDetails(): Promise<LawyerMyDetailsApiResponse> {
    const response = await api.get('/lawyers/me');
    return response.data;
  }

  // Update current lawyer's own details (lawyer only)
  async updateMyDetails(data: Partial<Lawyer>): Promise<any> {
    const response = await api.put('/lawyers/me', data);
    return response.data;
  }

  // Update profile with image data
  async updateMyDetailsWithImage(data: Partial<Lawyer>, imageFile?: File): Promise<any> {
    if (imageFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const base64Image = reader.result as string;
            const updateData = {
              ...data,
              profilePicture: base64Image
            };
            const response = await api.put('/lawyers/me', updateData);
            resolve(response.data);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(imageFile);
      });
    } else {
      const response = await api.put('/lawyers/me', data);
      return response.data;
    }
  }

  // Upload profile picture (lawyer only)
  async uploadProfilePicture(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Image = reader.result as string;
          const response = await api.put('/lawyers/me', {
            profilePicture: base64Image
          });
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
}

export default new LawyerService();
