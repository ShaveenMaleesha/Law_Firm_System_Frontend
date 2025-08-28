import { useState } from "react";
import appointmentService from "../../services/appointmentService";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    subject: '',
    description: '',
    date: '',
    time: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    // Validation
    if (!formData.clientName || !formData.clientPhone || !formData.clientEmail || 
        !formData.subject || !formData.description || !formData.date || !formData.time) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      await appointmentService.createAppointment(formData);
      
      setSuccessMessage('Appointment request submitted successfully! We will contact you soon.');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          clientName: '',
          clientPhone: '',
          clientEmail: '',
          subject: '',
          description: '',
          date: '',
          time: ''
        });
        setSuccessMessage('');
        onClose();
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to submit appointment request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      subject: '',
      description: '',
      date: '',
      time: ''
    });
    setError('');
    setSuccessMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-gray-900 text-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Left Side - Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Consult Our Experts
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our expert team of partners and leading lawyers offer services 
              across extensive practice areas and ensure our clients receive 
              optimal legal advice. They have the capacity to handle 
              everything from intricate cases to crucial disputes, providing 
              top-tier solutions with unwavering dedication and expertise.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="bg-gray-800/50 p-8 lg:p-12 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="clientName"
                    placeholder="Full Name"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="clientPhone"
                    placeholder="Phone Number"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    name="clientEmail"
                    placeholder="Email Address"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-400">Select Practice Area</option>
                    <option value="Foreign Investment">Foreign Investment</option>
                    <option value="Banking & Finance">Banking & Finance</option>
                    <option value="Capital Markets & Securities">Capital Markets & Securities</option>
                    <option value="Mergers and Acquisitions">Mergers and Acquisitions</option>
                    <option value="Competition and Anti-trust">Competition and Anti-trust</option>
                    <option value="Infrastructure Development">Infrastructure Development</option>
                    <option value="Construction, Real Estate, Labour">Construction, Real Estate, Labour</option>
                    <option value="Employment and Immigration">Employment and Immigration</option>
                    <option value="Restructuring and Insolvency">Restructuring and Insolvency</option>
                    <option value="Intellectual Property">Intellectual Property</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Admiralty and Shipping">Admiralty and Shipping</option>
                    <option value="Litigation and Dispute Resolution">Litigation and Dispute Resolution</option>
                    <option value="Tax">Tax</option>
                    <option value="Family Law and Testamentary">Family Law and Testamentary</option>
                    <option value="Company Secretaries">Company Secretaries</option>
                    <option value="Other">Other</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]} // Prevent past dates
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <textarea
                  name="description"
                  placeholder="Please describe your legal issue or consultation needs"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-900/20 rounded-md border border-red-800">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="p-3 text-sm text-green-400 bg-green-900/20 rounded-md border border-green-800">
                  {successMessage}
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {isLoading ? 'Submitting...' : 'Schedule Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
