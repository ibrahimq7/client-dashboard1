import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { Zap, Building2, Check, Clock, DollarSign, AlertTriangle, ArrowRight, Info, ChevronDown, ChevronUp, Layers, Settings } from 'lucide-react';

export default function PlatformStrategySection() {
  const { state, updatePlatformStrategy } = usePortal();
  const { platformStrategy } = state;
  const [expanded, setExpanded] = useState<'managed' | 'enterprise' | null>(null);

  const platforms = [
    {
      id: 'managed' as const,
      title: 'Managed Commerce Platform',
      subtitle: 'Launch Faster Using Proven Commerce Infrastructure',
      description: 'A commerce solution built on an established commerce ecosystem. The platform is configured, customized, branded, and optimized according to business requirements.',
      investment: '$490 – $952+',
      timeline: '2 – 8 Weeks',
      effort: 'Low to Medium',
      bestFor: ['Faster launch', 'Lower investment', 'Simpler operations'],
      advantages: ['Faster implementation', 'Lower initial investment', 'Easier maintenance', 'Proven ecosystem'],
      considerations: ['Platform limitations', 'Ongoing platform fees', 'Limited deep customization'],
      deliverables: ['Commerce Website', 'Product Catalog', 'Order Management', 'Customer Accounts'],
      process: ['Requirements', 'Configuration', 'Design', 'Product Setup', 'Testing', 'Launch'],
    },
    {
      id: 'enterprise' as const,
      title: 'Enterprise Custom Platform',
      subtitle: 'Built Specifically Around Your Business',
      description: 'A fully customized commerce platform designed and developed according to business requirements, workflows, and growth plans.',
      investment: '$952 – $1,587+',
      timeline: '3 – 12+ Months',
      effort: 'High',
      bestFor: ['Long-term growth', 'Advanced workflows', 'Unique experiences'],
      advantages: ['Unlimited customization', 'Full control', 'Advanced scalability', 'No limitations', 'Easier integrations'],
      considerations: ['Higher investment', 'Longer implementation', 'Greater development effort'],
      deliverables: ['Custom Architecture', 'Custom Admin', 'Custom Business Logic', 'Advanced Integrations', 'Full Ownership'],
      process: ['Discovery', 'UX Research', 'UI Design', 'Architecture', 'Development', 'Testing', 'Deployment', 'Growth'],
    },
  ];

  const comparison = [
    { feature: 'Initial Investment', managed: 'Lower', enterprise: 'Higher' },
    { feature: 'Development Time', managed: 'Faster', enterprise: 'Extended' },
    { feature: 'Customization', managed: 'Moderate', enterprise: 'Unlimited' },
    { feature: 'Scalability', managed: 'High', enterprise: 'Very High' },
    { feature: 'Ownership', managed: 'Platform Dependent', enterprise: 'Full Control' },
    { feature: 'Integrations', managed: 'Supported', enterprise: 'Unlimited' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Commerce Platform Strategy</h2>
        <p className="text-slate-400">Two Approaches to Building Your Commerce Platform</p>
      </motion.div>

      <div className="glass-card rounded-xl p-4 border border-white/10 mb-6">
        <div className="flex items-start gap-3"><Info className="w-5 h-5 text-slate-400 mt-0.5" /><p className="text-slate-400 text-sm">Investment ranges and timelines are market reference estimates. Actual costs vary based on project scope, integrations, and complexity.</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {platforms.map((option) => (
          <motion.div key={option.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`relative glass-card rounded-2xl overflow-hidden ${platformStrategy.selectedPlatform === option.id ? 'ring-2 ring-violet-500 shadow-glow-purple' : ''}`}>
            <button onClick={() => updatePlatformStrategy({ selectedPlatform: option.id })} className="absolute top-4 right-4 z-10">
              <motion.div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${platformStrategy.selectedPlatform === option.id ? 'border-violet-500 bg-violet-500' : 'border-white/30 bg-white/10'}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>{platformStrategy.selectedPlatform === option.id && <Check className="w-4 h-4 text-white" />}</motion.div>
            </button>
            <div className={`p-6 border-b border-white/10 ${option.id === 'managed' ? 'bg-cyan-500/10' : 'bg-violet-500/10'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${option.id === 'managed' ? 'bg-cyan-500/20' : 'bg-violet-500/20'}`}>{option.id === 'managed' ? <Zap className="w-6 h-6 text-cyan-400" /> : <Building2 className="w-6 h-6 text-violet-400" />}</div>
                <div><h3 className="text-xl font-bold text-white">{option.title}</h3><p className={`text-sm ${option.id === 'managed' ? 'text-cyan-400' : 'text-violet-400'}`}>{option.subtitle}</p></div>
              </div>
              <p className="text-slate-400 text-sm">{option.description}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-3"><div className="flex items-center gap-2 mb-1"><DollarSign className="w-4 h-4 text-slate-500" /><span className="text-slate-500 text-xs">Investment</span></div><p className="text-white font-semibold">{option.investment}</p></div>
                <div className="glass rounded-xl p-3"><div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-slate-500" /><span className="text-slate-500 text-xs">Timeline</span></div><p className="text-white font-semibold">{option.timeline}</p></div>
              </div>
              <div><p className="text-slate-500 text-xs mb-2">Best For</p><div className="flex flex-wrap gap-2">{option.bestFor.map((item) => <span key={item} className={`px-3 py-1 rounded-full text-xs font-medium ${option.id === 'managed' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-violet-500/20 text-violet-400'}`}>{item}</span>)}</div></div>
              <button onClick={() => setExpanded(expanded === option.id ? null : option.id)} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400">{expanded === option.id ? <><ChevronUp className="w-4 h-4" /><span className="text-sm">Show Less</span></> : <><ChevronDown className="w-4 h-4" /><span className="text-sm">View Details</span></>}</button>
            </div>
            <AnimatePresence>{expanded === option.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-6 pt-0 space-y-4">
                  <div><p className="text-slate-500 text-xs mb-2">Process</p><div className="flex flex-wrap gap-2 items-center">{option.process.map((step, idx) => <div key={step} className="flex items-center gap-2"><span className={`px-2 py-1 rounded-lg text-xs ${option.id === 'managed' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-violet-500/20 text-violet-400'}`}>{step}</span>{idx < option.process.length - 1 && <ArrowRight className="w-3 h-3 text-slate-600" />}</div>)}</div></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-emerald-400 text-xs mb-2">Advantages</p><ul className="space-y-1">{option.advantages.map((a) => <li key={a} className="flex items-center gap-2 text-slate-300 text-xs"><Check className="w-3 h-3 text-emerald-400" />{a}</li>)}</ul></div>
                    <div><p className="text-amber-400 text-xs mb-2">Considerations</p><ul className="space-y-1">{option.considerations.map((c) => <li key={c} className="flex items-center gap-2 text-slate-300 text-xs"><AlertTriangle className="w-3 h-3 text-amber-400" />{c}</li>)}</ul></div>
                  </div>
                  <div><p className="text-slate-500 text-xs mb-2">What You Receive</p><div className="grid grid-cols-2 gap-2">{option.deliverables.map((d) => <div key={d} className="flex items-center gap-2 p-2 rounded-lg bg-white/5"><Layers className={`w-4 h-4 ${option.id === 'managed' ? 'text-cyan-400' : 'text-violet-400'}`} /><span className="text-slate-300 text-xs">{d}</span></div>)}</div></div>
                </div>
              </motion.div>
            )}</AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Settings className="w-5 h-5 text-purple-400" /></div>
          <div><h3 className="text-white font-medium">Platform Comparison</h3><p className="text-slate-500 text-sm">Key factors comparison</p></div>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-slate-500 text-sm">Factor</th><th className="text-center py-3"><span className="text-cyan-400 font-medium text-sm">Managed</span></th><th className="text-center py-3"><span className="text-violet-400 font-medium text-sm">Enterprise</span></th></tr></thead>
          <tbody>{comparison.map((row, i) => (
            <motion.tr key={row.feature} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-3 px-4 text-slate-300 text-sm">{row.feature}</td>
              <td className="py-3 px-4 text-center"><span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">{row.managed}</span></td>
              <td className="py-3 px-4 text-center"><span className="px-2 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs">{row.enterprise}</span></td>
            </motion.tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
