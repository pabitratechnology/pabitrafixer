import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public Page Imports
import { Home } from "./pages/Home";
import { JobList } from "./pages/JobList";
import { JobDetail } from "./pages/JobDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { AdmitCards } from "./pages/AdmitCards";
import { Results } from "./pages/Results";
import { AnswerKeys } from "./pages/AnswerKeys"; 
import { SyllabusList } from "./pages/SyllabusList";
import { PreviousPapers } from "./pages/PreviousPapers";
import { StudyMaterials } from "./pages/StudyMaterials";
import { Aboutus } from "./pages/About"; // Imported here
import { Careers } from "./pages/Careers";
import { Press } from "./pages/Press";
import { Blog } from "./pages/Blog";

// Protected Page Imports
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { PostJob } from "./pages/PostJob";
import { PostNotification } from "./pages/PostNotification";
import { AdminJobManagement } from "./pages/AdminJobManagement";
import { AdminUserManagement } from "./pages/AdminUserManagement";
import { ContentManagement } from "./pages/ContentManagement";
import { AdminLogin } from "./pages/AdminLogin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        
        {/* Main layout wrapper */}
        <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700">
          
          <Navbar />

          <main className="grow">
            <Routes>
              {/* ==========================================
                  1. PUBLIC ROUTES (Accessible to all)
                  ========================================== */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Aboutus />} /> {/* Added the About Route here */}
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              
              {/* Auth Flow */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Notification Hubs */}
              <Route path="/admit-cards" element={<AdmitCards />} />
              <Route path="/results" element={<Results />} />
              <Route path="/answer-keys" element={<AnswerKeys />} />

              {/* Educational Resources */}
              <Route path="/syllabus" element={<SyllabusList />} />
              <Route path="/previous-papers" element={<PreviousPapers />} />
              <Route path="/study-materials" element={<StudyMaterials />} />

              {/* ==========================================
                  2. PROTECTED USER ROUTES (Login Required)
                  ========================================== */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* ==========================================
                  3. ADMINISTRATIVE ROUTES (Admin/Recruiter)
                  ========================================== */}
              <Route path="/admin/jobs" element={
                <ProtectedRoute>
                  <AdminJobManagement />
                </ProtectedRoute>
              } />
              <Route path="/jobs/post" element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              } />
              <Route path="/jobs/edit/:id" element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              } />
              <Route path="/notifications/post" element={
                <ProtectedRoute>
                  <PostNotification />
                </ProtectedRoute>
              } />

              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <AdminUserManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/content" element={
                <ProtectedRoute>
                  <ContentManagement />
                </ProtectedRoute>
              } />
              
              {/* ==========================================
                  4. ERROR HANDLING
                  ========================================== */}
              <Route path="*" element={
                <div className="py-32 text-center space-y-4">
                  <h2 className="text-6xl font-black text-slate-200 uppercase tracking-tighter">404</h2>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Resource Not Found</p>
                  <Link to="/" className="inline-block mt-4 text-indigo-600 font-black border-b-2 border-indigo-600 hover:text-indigo-800 transition-colors">Return to Home</Link>
                </div>
              } />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;