import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AdminSignUp from "./pages/AuthPages/AdminSignUp";
import ClientSignUp from "./pages/AuthPages/ClientSignUp";
import LawyerSignUp from "./pages/AuthPages/LawyerSignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import ClientLayout from "./layout/ClientLayout";
import LawyerLayout from "./layout/LawyerLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Dashboard/Home";
import Appointment from "./pages/Appointment";
import LowyerList from "./pages/LowyerList/Index";
import ClientList from "./pages/ClientList/Index";
import CasesTable from "./pages/Cases";
import BlogTable from "./pages/BlogList";
import LandingPage from "./pages/LandingPage";
// Client Pages
import {
  ClientDashboard,
  ClientAppointments,
  ClientCases,
  ClientDocuments,
  ClientProfile
} from "./pages/clientPages";
// Lawyer Pages
import {
  LawyerDashboard,
  LawyerAppointments,
  LawyerCases,
  LawyerClients,
  LawyerDocuments,
  LawyerBlogs,
  LawyerProfile
} from "./pages/lawyerPages";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Landing Page */}
          <Route path="/landing" element={<LandingPage />} />

          {/* Admin Dashboard Layout */}
          <Route element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index path="/" element={<Home />} />
            {/*Admin Dashboard Pages */}
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/lawyer-list" element={<LowyerList />} />
            <Route path="/cleint-list" element={<ClientList />} />
            <Route path="/cases-list" element={<CasesTable />} />
            <Route path="/blog-list" element={<BlogTable />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Client Dashboard Layout */}
          <Route path="/client" element={
            <ProtectedRoute requiredRole="client">
              <ClientLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ClientDashboard />} />
            <Route path="appointments" element={<ClientAppointments />} />
            <Route path="cases" element={<ClientCases />} />
            <Route path="documents" element={<ClientDocuments />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>

          {/* Lawyer Dashboard Layout */}
          <Route path="/lawyer" element={
            <ProtectedRoute requiredRole="lawyer">
              <LawyerLayout />
            </ProtectedRoute>
          }>
            <Route index element={<LawyerDashboard />} />
            <Route path="appointments" element={<LawyerAppointments />} />
            <Route path="cases" element={<LawyerCases />} />
            <Route path="clients" element={<LawyerClients />} />
            <Route path="documents" element={<LawyerDocuments />} />
            <Route path="blogs" element={<LawyerBlogs />} />
            <Route path="profile" element={<LawyerProfile />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/admin" element={<AdminSignUp />} />
          <Route path="/signup/client" element={<ClientSignUp />} />
          <Route path="/signup/lawyer" element={<LawyerSignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
