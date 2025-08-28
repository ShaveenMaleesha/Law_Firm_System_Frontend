import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AppointmentTable from "../../components/tables/AppointmentTable";

export default function Appointment() {
  return (
    <>
      <PageMeta
        title="Appointment"
        description="This is Appointment page"
      />
      <PageBreadcrumb pageTitle="Appointment" />
      <div className="space-y-6">
        <ComponentCard title="Appointment List">
          <AppointmentTable />
        </ComponentCard>
      </div>
    </>
  );
}
