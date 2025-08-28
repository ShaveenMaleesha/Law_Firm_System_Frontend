import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

export default function LawyerAppointments() {
  return (
    <>
      <PageMeta
        title="My Appointments"
        description="Lawyer appointments page"
      />
      <PageBreadcrumb pageTitle="My Appointments" />
      <div className="space-y-6">
        <ComponentCard title="Today's Appointments">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Client Consultation - Emma Wilson
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Initial consultation - Family Law
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Today</span>
                    <span>🕒 10:00 AM</span>
                    <span>📍 Office Meeting</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  Upcoming
                </span>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Court Hearing - Smith vs. Johnson
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Contract dispute hearing - Civil Court
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Today</span>
                    <span>🕒 2:30 PM</span>
                    <span>🏛️ Civil Court Room 3</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 rounded-full">
                  Court Hearing
                </span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Upcoming This Week">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Document Review - Michael Brown
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Real Estate Contract Review
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Dec 30, 2025</span>
                    <span>🕒 11:00 AM</span>
                    <span>💻 Video Call</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  Confirmed
                </span>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Strategy Meeting - Corporate Client
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Merger & Acquisition Planning
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Jan 02, 2026</span>
                    <span>🕒 9:00 AM</span>
                    <span>📍 Conference Room A</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Schedule New Appointment
          </button>
        </div>
      </div>
    </>
  );
}
