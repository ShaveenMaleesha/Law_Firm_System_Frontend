import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import LowyerListTable from "../../components/tables/LowyerListTable";

export default function LowyerList() {
  return (
    <>
      <PageMeta
        title="LowyerList"
        description="This is LowyerList page"
      />
      <PageBreadcrumb pageTitle="Lowyer List" />
      <div className="space-y-6">
        <ComponentCard title="Lowyer List">
          <LowyerListTable />
        </ComponentCard>
      </div>
    </>
  );
}
