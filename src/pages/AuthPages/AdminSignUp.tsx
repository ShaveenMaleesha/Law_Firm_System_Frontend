import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import AdminSignUpForm from "../../components/auth/AdminSignUpForm";

export default function AdminSignUp() {
  return (
    <>
      <PageMeta
        title="Admin Registration | Law Firm Management System"
        description="Create an admin account for the Law Firm Management System"
      />
      <AuthLayout>
        <AdminSignUpForm />
      </AuthLayout>
    </>
  );
}
