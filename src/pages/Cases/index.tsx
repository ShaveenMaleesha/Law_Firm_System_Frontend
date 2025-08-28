import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import CasesListTable from "../../components/tables/CasesTable";

export default function CasesTable() {
  return (
    <>
      <PageMeta
        title="Cases"
        description="This is Cases page"
      />
      <PageBreadcrumb pageTitle="Cases" />
      <div className="space-y-6">
        <ComponentCard title="Cases List">
          <CasesListTable />
        </ComponentCard>
      </div>
    </>
  );
}
