import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BlogListTable from "../../components/tables/BlogTables";

export default function BlogTable() {
  return (
    <>
      <PageMeta
        title="Blogs"
        description="This is Blog page"
      />
      <PageBreadcrumb pageTitle="Blogs" />
      <div className="space-y-6">
        <ComponentCard title="Blog List">
          <BlogListTable />
        </ComponentCard>
      </div>
    </>
  );
}
