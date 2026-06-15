import { motion, Reorder } from 'framer-motion';
import { usePortal } from '../../context/PortalContext';
import { Zap, DollarSign, TrendingUp, Palette, Crown, Shield, Rocket, GripVertical } from 'lucide-react';

const priorityConfig = [
  { id: 'speed', name: 'Launch Speed', icon: Zap, color: 'text-amber-400' },
  { id: 'budget', name: 'Budget Efficiency', icon: DollarSign, color: 'text-emerald-400' },
  { id: 'scale', name: 'Scalability', icon: TrendingUp, color: 'text-cyan-400' },
  { id: 'custom', name: 'Customization', icon: Palette, color: 'text-purple-400' },
  { id: 'premium', name: 'Premium Experience', icon: Crown, color: 'text-violet-400' },
  { id: 'security', name: 'Security', icon: Shield, color: 'text-red-400' },
  { id: 'growth', name: 'Growth Potential', icon: Rocket, color: 'text-indigo-400' },
];

export default function ProjectPrioritiesSection() {
  const { state, updateProjectPriorities } = usePortal();
  const { projectPriorities } = state;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Project Priorities</h2>
        <p className="text-slate-400">Rank priorities by dragging items. Top = highest priority.</p>
      </motion.div>

      <div className="glass-card rounded-xl p-3 mb-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center"><GripVertical className="w-5 h-5 text-violet-400" /></div>
        <div className="flex-1"><p className="text-white font-medium">Drag to Reorder</p><p className="text-slate-500 text-sm">Move items up for higher priority</p></div>
        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-400 rounded-lg flex items-center justify-center"><span className="text-dark-900 font-bold">1</span></div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <Reorder.Group axis="y" values={projectPriorities} onReorder={updateProjectPriorities} className="space-y-3">
          {projectPriorities.map((priority, index) => {
            const config = priorityConfig.find(p => p.id === priority.id);
            if (!config) return null;
            const Icon = config.icon;
            return (
              <Reorder.Item key={priority.id} value={priority} className="cursor-grab active:cursor-grabbing">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.01 }} whileDrag={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} className={`glass-card rounded-xl p-4 flex items-center gap-4 ${index === 0 ? 'border-l-4 border-l-amber-500' : index === 1 ? 'border-l-4 border-l-slate-400' : index === 2 ? 'border-l-4 border-l-amber-700' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${index === 0 ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-dark-900' : index === 1 ? 'bg-gradient-to-r from-slate-400 to-slate-300 text-dark-900' : index === 2 ? 'bg-gradient-to-r from-amber-800 to-amber-700 text-white' : 'bg-white/10 text-slate-400'}`}>{index + 1}</div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Icon className={`w-5 h-5 ${config.color}`} /></div>
                  <div className="flex-1"><h3 className="text-white font-medium">{priority.name}</h3><p className="text-slate-500 text-sm">{priority.description}</p></div>
                  <GripVertical className="w-5 h-5 text-slate-600" />
                </motion.div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[{ rank: 1, label: 'Top Priority', color: 'amber' }, { rank: 2, label: 'Second Priority', color: 'slate-400' }, { rank: 3, label: 'Third Priority', color: 'amber-600' }].map(({ rank, label, color }) => (
          <div key={rank} className={`glass-card rounded-xl p-4 border border-${color}/30`}>
            <div className={`text-${color} text-sm font-medium mb-2`}>{label}</div>
            <h4 className="text-white font-semibold">{projectPriorities[rank - 1]?.name}</h4>
          </div>
        ))}
      </div>

      {projectPriorities[0]?.id === 'speed' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5 border-l-4 border-cyan-500">
          <div className="flex items-start gap-3"><Zap className="w-5 h-5 text-cyan-400" /><div><h4 className="text-cyan-400 font-medium">Speed Prioritized</h4><p className="text-slate-400 text-sm mt-1">A managed platform may help you enter the market faster.</p></div></div>
        </motion.div>
      )}
    </div>
  );
}
