import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Building2, Package, Users, ShoppingCart, TrendingUp, Target, GitCompare, MessageSquare, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

const navItems = [
  { id: 0, label: 'Overview', icon: LayoutDashboard },
  { id: 1, label: 'Business Information', icon: Building2 },
  { id: 2, label: 'Product Information', icon: Package },
  { id: 3, label: 'Customer Experience', icon: Users },
  { id: 4, label: 'Order Management', icon: ShoppingCart },
  { id: 5, label: 'Growth Strategy', icon: TrendingUp },
  { id: 6, label: 'Project Priorities', icon: Target },
  { id: 7, label: 'Platform Strategy', icon: GitCompare },
  { id: 8, label: 'Collaboration Center', icon: MessageSquare },
  { id: 9, label: 'Executive Summary', icon: FileText },
];

export default function Sidebar() {
  const { state, setCurrentSection } = usePortal();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}>
      <div className="h-full glass-panel rounded-r-2xl flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3" style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <AnimatePresence>{!isCollapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><h1 className="text-white font-semibold text-lg">Commerce</h1><p className="text-violet-400 text-xs">Strategy Portal</p></motion.div>}</AnimatePresence>
          </div>
        </div>
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = state.currentSection === item.id;
              return (
                <li key={item.id}>
                  <button onClick={() => setCurrentSection(item.id)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-violet-600/20 to-transparent border-l-2 border-violet-500' : 'hover:bg-white/5'}`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isActive ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30' : 'bg-white/5'}`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </div>
                    <AnimatePresence>{!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-400'}`}>{item.label}</motion.span>}</AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-slate-400 hover:text-white">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span className="text-sm">Collapse</span></>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
