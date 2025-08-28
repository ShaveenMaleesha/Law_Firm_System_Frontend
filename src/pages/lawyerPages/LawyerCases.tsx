import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

export default function LawyerCases() {
  return (
    <>
      <PageMeta
        title="My Cases"
        description="Lawyer cases management page"
      />
      <PageBreadcrumb pageTitle="My Cases" />
      <div className="space-y-6">
        <ComponentCard title="Active Cases">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Wilson vs. ABC Corporation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Employment Law - Wrongful Termination
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Started: Oct 15, 2025</span>
                    <span>👤 Client: Emma Wilson</span>
                    <span>📋 Evidence: 12 files</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">
                    Discovery Phase
                  </span>
                  <p className="text-sm text-gray-500 mt-1">High Priority</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Brown Property Acquisition
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Real Estate Law - Commercial Property Purchase
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Started: Nov 20, 2025</span>
                    <span>👤 Client: Michael Brown</span>
                    <span>📋 Documents: 8 files</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                    Due Diligence
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Medium Priority</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    TechCorp Merger Advisory
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Corporate Law - Merger & Acquisition
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Started: Dec 01, 2025</span>
                    <span>👤 Client: TechCorp Ltd.</span>
                    <span>📋 Documents: 25 files</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    Contract Review
                  </span>
                  <p className="text-sm text-gray-500 mt-1">High Priority</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Recently Closed Cases">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Johnson Contract Dispute
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Commercial Law - Breach of Contract
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Closed: Dec 20, 2025</span>
                    <span>👤 Client: Sarah Johnson</span>
                    <span>✅ Outcome: Settled</span>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  Successful
                </span>
              </div>
            </div>
          </div>
        </ComponentCard>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create New Case
          </button>
        </div>
      </div>
    </>
  );
}
