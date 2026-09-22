import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { CourseDetail } from './pages/CourseDetail';
// import { Login } from './pages/Login';
// import { Register } from './pages/Register';
// import { Checkout } from './pages/Checkout';
// import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Legal } from './pages/Legal';
// import { GenericPage } from './pages/GenericPage';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Full-screen Auth & Checkout Routes (temporarily disabled for backend integration) */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/checkout/:courseId" element={<Checkout />} /> */}

        {/* Full-screen LMS Route (accessible in demo mode) */}
        <Route path="/learn/:slug" element={<Learn />} />

        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Catalog />} />
          <Route path="courses/:slug" element={<CourseDetail />} />
          <Route path="categories/:slug" element={<Catalog />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          {/* <Route path="careers" element={<GenericPage title="Careers" subtitle="Join our world-class team of educators and engineers." />} />
          <Route path="projects" element={<GenericPage title="Projects Showcase" subtitle="Explore what our students have built." />} /> */}
          <Route path="terms" element={<Legal title="Terms of Service" />} />
          <Route path="privacy" element={<Legal title="Privacy Policy" />} />
          <Route path="cookies" element={<Legal title="Cookie Policy" />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
