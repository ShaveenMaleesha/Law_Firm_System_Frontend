import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ClientSignUpForm from "../../components/auth/ClientSignUpForm";

export default function ClientSignUp() {
  return (
    <>
      <PageMeta
        title="Client Registration | Law Firm Management System"
        description="Create a client account for the Law Firm Management System"
      />
      <AuthLayout>
        <ClientSignUpForm />
      </AuthLayout>
    </>
  );
}
