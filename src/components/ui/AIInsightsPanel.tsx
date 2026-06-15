import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { Sparkles, Package, Globe2, TrendingUp, Shield, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface Insight { id: string; type: 'info' | 'warning' | 'success' | 'opportunity'; title: string; description: string; icon: React.ElementType; }

export default function AIInsightsPanel() {
  const { state } = usePortal();
  const [isExpanded, setIsExpanded] = useState(true);

  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];
    if (state.productInfo.productCount === 'enterprise' || state.productInfo.productCount === 'large') {
      insights.push({ id: 'catalog', type: 'warning', title: 'Large Product Catalog Identified', description: 'Advanced search and filtering systems recommended.', icon: Package });
    }
    if (state.growthStrategy.expansionCountries.length > 2 || state.customerExperience.multiLanguage) {
      insights.push({ id: 'multi', type: 'info', title: 'Multi-Country Commerce Detected', description: 'Localization and currency handling required.', icon: Globe2 });
    }
    if (state.growthStrategy.expansionCountries.length > 3 || state.growthStrategy.mobileApp) {
      insights.push({ id: 'growth', type: 'opportunity', title: 'High Growth Potential', description: 'Build with scalability as a priority.', icon: TrendingUp });
    }
    if (state.projectPriorities[0]?.id === 'scale') {
      insights.push({ id: 'scale', type: 'success', title: 'Scalability Appears Important', description: 'Ensure architecture supports growth.', icon: TrendingUp });
    }
    if (state.projectPriorities[0]?.id === 'speed') {
      insights.push({ id: 'speed', type: 'opportunity', title: 'Launch Speed Prioritized', description: 'Consider a platform approach with future customization.', icon: Zap });
    }
    if (state.projectPriorities.some(p => p.id === 'security' && state.projectPriorities.indexOf(p) < 3)) {
      insights.push({ id: 'security', type: 'warning', title: 'High Security Priority', description: 'Ensure PCI compliance and data protection.', icon: Shield });
    }
    return insights;
  };

  const insights = generateInsights();
  if (insights.length === 0) return null;

  const typeStyles = { info: 'bg-cyan-500/20 text-cyan-400', warning: 'bg-amber-500/20 text-amber-400', success: 'bg-emerald-500/20 text-emerald-400', opportunity: 'bg-violet-500/20 text-violet-400' };

  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="fixed right-6 top-24 w-80 z-40">
      <motion.button onClick={() => setIsExpanded(!isExpanded)} className="w-full glass-panel rounded-t-xl p-3 flex items-center justify-between hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center animate-pulse"><Sparkles className="w-4 h-4 text-violet-400" /></div>
          <span className="text-white font-medium text-sm">AI Insights</span>
          <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs">{insights.length}</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </motion.button>
      {isExpanded && (
        <div className="glass-panel rounded-b-xl p-4 space-y-3 max-h-96 overflow-y-auto">
          {insights.map((insight, i) => {
            const Icon = insight.icon;
            return (
              <motion.div key={insight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`p-3 rounded-xl ${typeStyles[insight.type]}`}>
                <div className="flex items-start gap-2">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div><p className="font-medium text-sm text-white">{insight.title}</p><p className="text-slate-400 text-xs mt-1">{insight.description}</p></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
