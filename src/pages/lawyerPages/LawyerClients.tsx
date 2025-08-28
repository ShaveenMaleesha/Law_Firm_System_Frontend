import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

export default function LawyerClients() {
  return (
    <>
      <PageMeta
        title="Client Management"
        description="Lawyer client management page"
      />
      <PageBreadcrumb pageTitle="Client Management" />
      <div className="space-y-6">
        <ComponentCard title="Active Clients">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">EW</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Emma Wilson
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      emma.wilson@email.com • +1 (555) 123-4567
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>⚖️ Employment Law</span>
                      <span>📋 1 Active Case</span>
                      <span>📅 Since Oct 2025</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    Active
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Last contact: Dec 26</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">MB</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Michael Brown
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      michael.brown@email.com • +1 (555) 987-6543
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>🏢 Real Estate Law</span>
                      <span>📋 1 Active Case</span>
                      <span>📅 Since Nov 2025</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    Active
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Last contact: Dec 27</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <span className="text-orange-600 dark:text-orange-400 font-semibold">TC</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      TechCorp Ltd.
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      legal@techcorp.com • +1 (555) 456-7890
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>🏛️ Corporate Law</span>
                      <span>📋 1 Active Case</span>
                      <span>📅 Since Dec 2025</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                    VIP Client
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Last contact: Today</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
