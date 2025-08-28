import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

export default function ClientAppointments() {
  return (
    <>
      <PageMeta
        title="My Appointments"
        description="Client appointments page"
      />
      <PageBreadcrumb pageTitle="My Appointments" />
      <div className="space-y-6">
        <ComponentCard title="Upcoming Appointments">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Consultation with John Smith
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Case Discussion - Property Law
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Dec 28, 2025</span>
                    <span>🕒 10:00 AM</span>
                    <span>📍 Office Meeting</span>
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
                    Document Review with Sarah Johnson
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Contract Review - Business Law
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Jan 02, 2026</span>
                    <span>🕒 2:00 PM</span>
                    <span>💻 Video Call</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Past Appointments">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Initial Consultation with John Smith
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Case Assessment - Property Law
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Dec 15, 2025</span>
                    <span>🕒 3:00 PM</span>
                    <span>📍 Office Meeting</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
