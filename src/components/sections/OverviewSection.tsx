import { motion } from 'framer-motion';
import { usePortal } from '../../context/PortalContext';
import { Sparkles, Package, Users, TrendingUp, CheckCircle } from 'lucide-react';
import type { ElementType } from 'react';
import { Stage } from '../../types';

const stageConfig: Record<Stage, { label: string; color: string }> = {
  initial: { label: 'Initial', color: '#94a3b8' },
  developing: { label: 'Developing', color: '#fbbf24' },
  advanced: { label: 'Advanced', color: '#22d3ee' },
  project_ready: { label: 'Project Ready', color: '#22c55e' },
};

export default function OverviewSection() {
  const { state, setCurrentSection, calculateOverallProgress } = usePortal();

  type Metric = { title: string; stage: Stage; icon: ElementType };

  const metrics: Metric[] = [
    { title: 'Business Readiness', stage: state.businessInfo.companyName ? 'advanced' : 'initial', icon: Sparkles },
    { title: 'Project Scope', stage: state.productInfo.productCount ? 'developing' : 'initial', icon: Package },
    { title: 'Commerce Complexity', stage: Object.values(state.customerExperience).filter(Boolean).length > 3 ? 'advanced' : 'developing', icon: Users },
    { title: 'Growth Potential', stage: state.growthStrategy.expansionCountries.length > 0 ? 'developing' : 'initial', icon: TrendingUp },
    { title: 'Requirements Clarity', stage: calculateOverallProgress(), icon: CheckCircle },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">Project Overview</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Track the progress of your commerce project planning.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-8 text-center glow-soft">
        <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Current Status</p>
        <div className="px-6 py-3 rounded-full inline-block" style={{ backgroundColor: `${stageConfig[calculateOverallProgress()].color}20`, borderColor: stageConfig[calculateOverallProgress()].color, border: '1px solid' }}>
          <span className="text-xl font-semibold" style={{ color: stageConfig[calculateOverallProgress()].color }}>{stageConfig[calculateOverallProgress()].label}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div key={metric.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-5 h-5 text-violet-400" />
                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${stageConfig[metric.stage].color}20`, color: stageConfig[metric.stage].color }}>{stageConfig[metric.stage].label}</span>
              </div>
              <h3 className="text-white font-medium">{metric.title}</h3>
              <div className="h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: stageConfig[metric.stage].color }} initial={{ width: 0 }} animate={{ width: metric.stage === 'project_ready' ? '100%' : metric.stage === 'advanced' ? '75%' : metric.stage === 'developing' ? '50%' : '20%' }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Start</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ title: 'Define Your Business', section: 1 }, { title: 'Describe Products', section: 2 }, { title: 'Set Experience Goals', section: 3 }].map((action, i) => (
            <motion.button key={action.title} onClick={() => setCurrentSection(action.section)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }} whileHover={{ scale: 1.02 }} className="glass-card rounded-xl p-5 text-left hover:bg-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 font-semibold">{action.section}</div>
                <span className="text-white font-medium">{action.title}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
