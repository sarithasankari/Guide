import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { GridSkeleton } from './components/SkeletonLoader';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Profile = lazy(() => import('./pages/Profile'));
const Booking = lazy(() => import('./pages/Booking'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Help = lazy(() => import('./pages/Help'));
const Experiences = lazy(() => import('./pages/Experiences'));
const StateDetails = lazy(() => import('./pages/StateDetails'));
const PlaceDetails = lazy(() => import('./pages/PlaceDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Planner = lazy(() => import('./pages/Planner'));

// Dashboard Layout & Pages
const DashboardLayout = lazy(() => import('./components/DashboardLayout'));
const TravelerDashboard = lazy(() => import('./pages/dashboards/TravelerDashboard'));
const GuideDashboard = lazy(() => import('./pages/dashboards/GuideDashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboards/AdminDashboard'));
const Messages = lazy(() => import('./pages/dashboards/Messages'));
const MyBookings = lazy(() => import('./pages/dashboards/MyBookings'));
const Reviews = lazy(() => import('./pages/dashboards/Reviews'));
const Settings = lazy(() => import('./pages/dashboards/Settings'));

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="pt-32 pb-20 max-w-7xl mx-auto px-4"><GridSkeleton count={4} /></div>}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
          <Route path="/guide/:id" element={<PageTransition><Profile /></PageTransition>} />
          <Route path="/book/:id" element={<PageTransition><Booking /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
          <Route path="/help" element={<PageTransition><Help /></PageTransition>} />
          <Route path="/experiences" element={<PageTransition><Experiences /></PageTransition>} />
          <Route path="/planner" element={<PageTransition><Planner /></PageTransition>} />
          
          {/* Dynamic Tourism Pages */}
          <Route path="/states/:stateSlug" element={<PageTransition><StateDetails /></PageTransition>} />
          <Route path="/states/:stateSlug/:placeSlug" element={<PageTransition><PlaceDetails /></PageTransition>} />
          
          {/* 404 Route */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />

          {/* Dashboard Routes with Layout */}
          <Route path="/dashboard" element={<PageTransition><DashboardLayout /></PageTransition>}>
            <Route index element={<Navigate to="traveler" replace />} />
            <Route path="traveler" element={<TravelerDashboard />} />
            <Route path="guide" element={<GuideDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="messages" element={<Messages />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-500/30 antialiased">
        <Navbar />
        <main className="flex-grow w-full relative">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
