import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

export default function ClientCases() {
  return (
    <>
      <PageMeta
        title="My Cases"
        description="Client cases page"
      />
      <PageBreadcrumb pageTitle="My Cases" />
      <div className="space-y-6">
        <ComponentCard title="Active Cases">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Property Dispute Resolution
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Case #2025-PD-001
                  </p>
                </div>
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  In Progress
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Assigned Lawyer:</span>
                  <p className="font-medium text-gray-800 dark:text-white">John Smith</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Start Date:</span>
                  <p className="font-medium text-gray-800 dark:text-white">Nov 15, 2025</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Next Hearing:</span>
                  <p className="font-medium text-gray-800 dark:text-white">Jan 10, 2026</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Last Update: Documents submitted for review. Awaiting court response.
                </p>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Contract Review & Negotiation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Case #2025-CR-003
                  </p>
                </div>
                <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                  Review
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Assigned Lawyer:</span>
                  <p className="font-medium text-gray-800 dark:text-white">Sarah Johnson</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Start Date:</span>
                  <p className="font-medium text-gray-800 dark:text-white">Dec 01, 2025</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Deadline:</span>
                  <p className="font-medium text-gray-800 dark:text-white">Jan 15, 2026</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Last Update: Contract terms reviewed. Preparing counter-proposal.
                </p>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Closed Cases">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Employment Contract Review
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Case #2025-EC-002
                  </p>
                </div>
                <span className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  Completed
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Assigned Lawyer:</span>
                  <p className="font-medium text-gray-800 dark:text-white">Michael Brown</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Completed:</span>
                  <p className="font-medium text-gray-800 dark:text-white">Dec 10, 2025</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <p className="font-medium text-gray-800 dark:text-white">2 weeks</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Final Update: Contract successfully negotiated and signed.
                </p>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
