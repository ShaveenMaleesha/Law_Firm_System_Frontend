import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import LawyerSignUpForm from "../../components/auth/LawyerSignUpForm";

export default function LawyerSignUp() {
  return (
    <>
      <PageMeta
        title="Lawyer Registration | Law Firm Management System"
        description="Create a lawyer account for the Law Firm Management System"
      />
      <AuthLayout>
        <LawyerSignUpForm />
      </AuthLayout>
    </>
  );
}
