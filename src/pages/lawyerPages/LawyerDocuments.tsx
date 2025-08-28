import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

export default function LawyerDocuments() {
  return (
    <>
      <PageMeta
        title="Documents"
        description="Lawyer documents management page"
      />
      <PageBreadcrumb pageTitle="Documents" />
      <div className="space-y-6">
        <ComponentCard title="Recent Documents">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 text-sm">📄</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Employment Contract - Wilson Case
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Contract documents and termination letter
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>📁 Wilson vs. ABC Corporation</span>
                      <span>📅 Uploaded: Dec 26, 2025</span>
                      <span>📊 2.5 MB</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                    Download
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm">📋</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Property Survey Report - Brown Property
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Official property survey and inspection reports
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>📁 Brown Property Acquisition</span>
                      <span>📅 Uploaded: Dec 25, 2025</span>
                      <span>📊 4.2 MB</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm">📑</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Merger Agreement Draft - TechCorp
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Initial merger agreement and due diligence documents
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>📁 TechCorp Merger Advisory</span>
                      <span>📅 Uploaded: Dec 24, 2025</span>
                      <span>📊 8.7 MB</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                    Draft
                  </button>
                  <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Document Categories">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <div className="h-12 w-12 mx-auto mb-3 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400">📄</span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Contracts</h3>
              <p className="text-sm text-gray-500">12 documents</p>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <div className="h-12 w-12 mx-auto mb-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400">⚖️</span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Legal Briefs</h3>
              <p className="text-sm text-gray-500">8 documents</p>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <div className="h-12 w-12 mx-auto mb-3 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400">📋</span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Evidence</h3>
              <p className="text-sm text-gray-500">25 documents</p>
            </div>
          </div>
        </ComponentCard>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upload Document
          </button>
        </div>
      </div>
    </>
  );
}
