import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ClientListTable from "../../components/tables/ClientTable";

export default function ClientList() {
  return (
    <>
      <PageMeta
        title="ClientList"
        description="This is ClientList page"
      />
      <PageBreadcrumb pageTitle="Client List" />
      <div className="space-y-6">
        <ComponentCard title="Client List">
          <ClientListTable />
        </ComponentCard>
      </div>
    </>
  );
}
