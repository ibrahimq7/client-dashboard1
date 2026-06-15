import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalProvider, usePortal } from './context/PortalContext';
import BackgroundOrbs from './components/ui/BackgroundOrbs';
import Sidebar from './components/layout/Sidebar';
import AIInsightsPanel from './components/ui/AIInsightsPanel';
import HeroSection from './components/sections/HeroSection';
import OverviewSection from './components/sections/OverviewSection';
import BusinessInfoSection from './components/sections/BusinessInfoSection';
import ProductInfoSection from './components/sections/ProductInfoSection';
import CustomerExperienceSection from './components/sections/CustomerExperienceSection';
import OrderManagementSection from './components/sections/OrderManagementSection';
import GrowthStrategySection from './components/sections/GrowthStrategySection';
import ProjectPrioritiesSection from './components/sections/ProjectPrioritiesSection';
import PlatformStrategySection from './components/sections/PlatformStrategySection';
import CollaborationSection from './components/sections/CollaborationSection';
import ExecutiveSummarySection from './components/sections/ExecutiveSummarySection';

const sectionTitles = ['Overview', 'Business Information', 'Product Information', 'Customer Experience', 'Order Management', 'Growth Strategy', 'Project Priorities', 'Platform Strategy', 'Collaboration Center', 'Executive Summary'];

function MainContent() {
  const { state, setCurrentSection } = usePortal();

  const sections = [
    <OverviewSection key="overview" />,
    <BusinessInfoSection key="business" />,
    <ProductInfoSection key="product" />,
    <CustomerExperienceSection key="customer" />,
    <OrderManagementSection key="order" />,
    <GrowthStrategySection key="growth" />,
    <ProjectPrioritiesSection key="priorities" />,
    <PlatformStrategySection key="platform" />,
    <CollaborationSection key="collaboration" />,
    <ExecutiveSummarySection key="executive" />,
  ];

  if (state.currentSection === -1) return <HeroSection />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-72 p-8 relative z-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6 text-sm">
        <button onClick={() => setCurrentSection(-1)} className="text-slate-500 hover:text-violet-400 transition-colors">Home</button>
        <span className="text-slate-600">/</span>
        <span className="text-violet-400">{sectionTitles[state.currentSection]}</span>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={state.currentSection} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          {sections[state.currentSection]}
        </motion.div>
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
        <button onClick={() => setCurrentSection(Math.max(0, state.currentSection - 1))} disabled={state.currentSection === 0} className={`px-6 py-3 rounded-xl transition-all ${state.currentSection === 0 ? 'bg-white/5 text-slate-600 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/20'}`}>Previous Section</button>
        {state.currentSection < sections.length - 1 ? (
          <button onClick={() => setCurrentSection(state.currentSection + 1)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/30">Next Section</button>
        ) : (
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => setCurrentSection(-1)} className="px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30">Return to Home</motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

function AppContent() {
  const { state } = usePortal();
  const isHero = state.currentSection === -1;
  const isPlatformSection = state.currentSection === 7;

  return (
    <div className="min-h-screen bg-dark-900">
      <BackgroundOrbs />
      <AnimatePresence>{!isHero && !isPlatformSection && <Sidebar />}</AnimatePresence>
      {!isHero && <AIInsightsPanel />}
      <main className="relative">
        <AnimatePresence mode="wait"><MainContent key={state.currentSection} /></AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  const { setCurrentSection } = usePortal();
  useEffect(() => { setCurrentSection(-1); }, [setCurrentSection]);
  return <AppContent />;
}

function AppWrapper() {
  return (
    <PortalProvider>
      <App />
    </PortalProvider>
  );
}

export default AppWrapper;
