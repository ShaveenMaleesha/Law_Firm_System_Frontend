import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { useState, useEffect, useRef } from "react";
import { LawyerDetailsResponse } from "../../services/lawyerService";
import LawyerService from "../../services/lawyerService";
import { useAuth } from "../../context/AuthContext";

export default function LawyerProfile() {
  const { refreshUserData } = useAuth();
  const [lawyerDetails, setLawyerDetails] = useState<LawyerDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("/images/user/user-01.jpg");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    contactNo: "",
    address: ""
  });

  useEffect(() => {
    fetchLawyerDetails();
  }, []);

  useEffect(() => {
    if (lawyerDetails) {
      setEditForm({
        name: lawyerDetails.name || "",
        email: lawyerDetails.email || "",
        contactNo: lawyerDetails.contactNo || "",
        address: lawyerDetails.address || ""
      });
      
      // Set profile image from database or use default
      if (lawyerDetails.profilePicture) {
        setProfileImage(lawyerDetails.profilePicture);
      }
    }
  }, [lawyerDetails]);

  const fetchLawyerDetails = async () => {
    try {
      setLoading(true);
      const response = await LawyerService.getMyDetails();
      console.log('Lawyer Details:', response);
      setLawyerDetails(response.lawyer);
      
      // Refresh user data in AuthContext to ensure consistency
      await refreshUserData();
    } catch (err: any) {
      console.error('Error fetching lawyer details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form to original values when canceling
      setEditForm({
        name: lawyerDetails?.name || "",
        email: lawyerDetails?.email || "",
        contactNo: lawyerDetails?.contactNo || "",
        address: lawyerDetails?.address || ""
      });
      
      // Reset image to original
      if (lawyerDetails?.profilePicture) {
        setProfileImage(lawyerDetails.profilePicture);
      } else {
        setProfileImage("/images/user/user-01.jpg");
      }
      setSelectedImageFile(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return;
      }

      setSelectedImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    // Basic validation
    if (!editForm.name.trim()) {
      alert('Name is required');
      return;
    }
    if (!editForm.email.trim()) {
      alert('Email is required');
      return;
    }
    if (!editForm.contactNo.trim()) {
      alert('Phone number is required');
      return;
    }
    if (!editForm.address.trim()) {
      alert('Address is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setUpdating(true);
      
      const updateData = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        contactNo: editForm.contactNo.trim(),
        address: editForm.address.trim()
      };

      // Use the new method that handles both profile data and image
      const response = await LawyerService.updateMyDetailsWithImage(updateData, selectedImageFile || undefined);
      console.log('Update response:', response);
      
      // Refresh the lawyer details and update AuthContext with latest data from API
      await fetchLawyerDetails();
      
      // Also refresh the auth context to ensure all user data is in sync with backend
      await refreshUserData();
      
      setIsEditing(false);
      setSelectedImageFile(null);
      
      // You could add a success toast here
      alert('Profile updated successfully!');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };



  if (loading) {
    return (
      <>
        <PageMeta
          title="Profile"
          description="Lawyer profile page"
        />
        <PageBreadcrumb pageTitle="Profile" />
        <div className="space-y-6">
          <ComponentCard title="Personal Information">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 dark:text-gray-300">Loading profile...</span>
              </div>
            </div>
          </ComponentCard>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Profile"
        description="Lawyer profile page"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="space-y-6">
        <ComponentCard title="Personal Information">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="relative h-32 w-32 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {updating ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <img
                      src={profileImage}
                      alt="Lawyer Profile"
                      className="h-full w-full object-cover"
                    />
                  )}
                  {isEditing && !updating && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition-opacity"
                    >
                      Change Photo
                    </button>
                  )}
                </div>
                {selectedImageFile && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    New image selected: {selectedImageFile.name}
                  </p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  {lawyerDetails?.name || 'N/A'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {lawyerDetails?.practiceArea && lawyerDetails.practiceArea.length > 0
                    ? lawyerDetails.practiceArea.length === 1
                      ? lawyerDetails.practiceArea[0]
                      : `${lawyerDetails.practiceArea[0]} +${lawyerDetails.practiceArea.length - 1} more`
                    : 'N/A'
                  }
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ID: #{lawyerDetails?._id ? lawyerDetails._id.slice(-8) : 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-800 dark:text-white">{lawyerDetails?.name || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-800 dark:text-white">{lawyerDetails?.email || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.contactNo}
                        onChange={(e) => handleInputChange('contactNo', e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-800 dark:text-white">{lawyerDetails?.contactNo || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-gray-800 dark:text-white">{lawyerDetails?.address || 'N/A'}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Practice Areas
                  </label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {lawyerDetails?.practiceArea && lawyerDetails.practiceArea.length > 0
                        ? lawyerDetails.practiceArea.map((area, index) => (
                            <span 
                              key={index} 
                              className={`px-3 py-1 rounded-full text-sm ${
                                index % 4 === 0
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                  : index % 4 === 1
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : index % 4 === 2
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                                  : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                              }`}
                            >
                              {area}
                            </span>
                          ))
                        : <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 rounded-full text-sm">
                            N/A
                          </span>
                      }
                    </div>
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Professional Statistics">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {lawyerDetails?.statistics?.totalCases || 0}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Total Cases</h3>
              <p className="text-sm text-gray-500">All time</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {lawyerDetails?.statistics?.successfulCases || 0}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Successful Cases</h3>
              <p className="text-sm text-gray-500">Won or settled</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {lawyerDetails?.statistics?.activeCases || 0}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Active Cases</h3>
              <p className="text-sm text-gray-500">Currently handling</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {lawyerDetails?.statistics?.totalClients || 0}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Total Clients</h3>
              <p className="text-sm text-gray-500">All time</p>
            </div>
          </div>
        </ComponentCard>

        {/* <ComponentCard title="Education & Certifications">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Juris Doctor (J.D.)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Harvard Law School
                  </p>
                  <p className="text-sm text-gray-500">2008 - 2011</p>
                </div>
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  Degree
                </span>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    State Bar Certification
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Licensed to practice in New York, California
                  </p>
                  <p className="text-sm text-gray-500">Since 2011</p>
                </div>
                <span className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>
        </ComponentCard> */}

        <div className="flex justify-end gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleEditToggle}
                disabled={updating}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveChanges}
                disabled={updating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {updating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </>
          ) : (
            <button 
              onClick={handleEditToggle}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </>
  );
}
