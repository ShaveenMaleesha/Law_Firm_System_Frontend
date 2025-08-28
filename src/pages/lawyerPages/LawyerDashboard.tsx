import PageMeta from "../../components/common/PageMeta";
import DashboardCards from "../../components/dashboard/dashboardCards";

export default function LawyerDashboard() {
  return (
    <>
      <PageMeta
        title="Lawyer Dashboard"
        description="Lawyer Dashboard page"
      />
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome to Your Lawyer Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your cases, appointments, clients, and legal practice efficiently.
          </p>
        </div>
        <DashboardCards />
      </div>
    </>
  );
}
