import { motion } from 'framer-motion';
import { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { Building2, Briefcase, Target, Users, Globe2, MapPin, Check } from 'lucide-react';

const industries = ['Fashion & Apparel', 'Electronics', 'Home & Furniture', 'Beauty', 'Food & Beverage', 'Healthcare', 'Automotive', 'Jewelry', 'Other'];
const businessModels = [{ id: 'b2c', label: 'Business to Consumer' }, { id: 'b2b', label: 'Business to Business' }, { id: 'marketplace', label: 'Multi-Vendor Marketplace' }, { id: 'hybrid', label: 'Hybrid Model' }];
const gccMarkets = [{ id: 'SA', label: 'Saudi Arabia', flag: 'SA' }, { id: 'AE', label: 'UAE', flag: 'AE' }, { id: 'QA', label: 'Qatar', flag: 'QA' }, { id: 'OM', label: 'Oman', flag: 'OM' }, { id: 'BH', label: 'Bahrain', flag: 'BH' }, { id: 'KW', label: 'Kuwait', flag: 'KW' }];
const goals = ['Launch New Store', 'Modernize Platform', 'Expand Markets', 'Increase Revenue', 'Improve CX', 'Build Brand', 'Integrate Systems'];

export default function BusinessInfoSection() {
  const { state, updateBusinessInfo } = usePortal();
  const { businessInfo } = state;
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMarket = (id: string) => updateBusinessInfo({ targetGCCMarkets: businessInfo.targetGCCMarkets.includes(id) ? businessInfo.targetGCCMarkets.filter(m => m !== id) : [...businessInfo.targetGCCMarkets, id] });
  const toggleGoal = (goal: string) => updateBusinessInfo({ businessGoals: businessInfo.businessGoals.includes(goal) ? businessInfo.businessGoals.filter(g => g !== goal) : [...businessInfo.businessGoals, goal] });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Business Information</h2>
        <p className="text-slate-400">Tell us about your business.</p>
      </motion.div>

      {/* Company Name */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center"><Building2 className="w-5 h-5 text-violet-400" /></div>
          <div><h3 className="text-white font-medium">Company Name</h3><p className="text-slate-500 text-sm">Your legal business name</p></div>
        </div>
        <input type="text" value={businessInfo.companyName} onChange={(e) => updateBusinessInfo({ companyName: e.target.value })} placeholder="Enter company name" className="input-glass" />
      </div>

      {/* Industry */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><Briefcase className="w-5 h-5 text-cyan-400" /></div>
          <div><h3 className="text-white font-medium">Industry</h3><p className="text-slate-500 text-sm">Select your primary industry</p></div>
        </div>
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)} className="input-glass flex items-center justify-between">
            <span className={businessInfo.industry ? 'text-white' : 'text-slate-500'}>{businessInfo.industry || 'Select industry'}</span>
            <svg className={`w-5 h-5 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showDropdown && <div className="absolute z-50 mt-2 w-full glass-panel rounded-xl overflow-hidden">{industries.map((ind) => <button key={ind} onClick={() => { updateBusinessInfo({ industry: ind }); setShowDropdown(false); }} className={`w-full px-4 py-3 text-left hover:bg-white/10 ${businessInfo.industry === ind ? 'bg-violet-500/20 text-violet-400' : 'text-slate-300'}`}>{ind}</button>)}</div>}
        </div>
      </div>

      {/* Business Model */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Target className="w-5 h-5 text-purple-400" /></div>
          <div><h3 className="text-white font-medium">Business Model</h3><p className="text-slate-500 text-sm">How do you operate?</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4">{businessModels.map((model) => <motion.button key={model.id} onClick={() => updateBusinessInfo({ businessModel: model.id })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border text-left ${businessInfo.businessModel === model.id ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><span className={`font-medium ${businessInfo.businessModel === model.id ? 'text-violet-400' : 'text-white'}`}>{model.label}</span></motion.button>)}</div>
      </div>

      {/* Target Customers */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center"><Users className="w-5 h-5 text-indigo-400" /></div>
          <div><h3 className="text-white font-medium">Target Customers</h3><p className="text-slate-500 text-sm">Describe your ideal customers</p></div>
        </div>
        <textarea value={businessInfo.targetCustomers} onChange={(e) => updateBusinessInfo({ targetCustomers: e.target.value })} placeholder="E.g., Young professionals aged 25-40..." rows={3} className="input-glass resize-none" />
      </div>

      {/* Target GCC Markets */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center"><Globe2 className="w-5 h-5 text-emerald-400" /></div>
          <div><h3 className="text-white font-medium">Target GCC Markets</h3><p className="text-slate-500 text-sm">Select markets to serve</p></div>
        </div>
        <div className="grid grid-cols-6 gap-3">{gccMarkets.map((market) => <motion.button key={market.id} onClick={() => toggleMarket(market.id)} whileHover={{ scale: 1.05 }} className={`p-3 rounded-xl border text-center ${businessInfo.targetGCCMarkets.includes(market.id) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><span className="text-lg block mb-1">{market.flag}</span><span className={`text-xs ${businessInfo.targetGCCMarkets.includes(market.id) ? 'text-violet-400' : 'text-slate-400'}`}>{market.label}</span></motion.button>)}</div>
      </div>

      {/* Business Goals */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center"><MapPin className="w-5 h-5 text-amber-400" /></div>
          <div><h3 className="text-white font-medium">Business Goals</h3><p className="text-slate-500 text-sm">Select all that apply</p></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{goals.map((goal) => <motion.button key={goal} onClick={() => toggleGoal(goal)} whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl border text-left flex items-center gap-2 ${businessInfo.businessGoals.includes(goal) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><div className={`w-5 h-5 rounded border flex items-center justify-center ${businessInfo.businessGoals.includes(goal) ? 'bg-violet-500 border-violet-500' : 'border-white/30'}`}>{businessInfo.businessGoals.includes(goal) && <Check className="w-3 h-3 text-white" />}</div><span className={`text-sm ${businessInfo.businessGoals.includes(goal) ? 'text-violet-400' : 'text-slate-300'}`}>{goal}</span></motion.button>)}</div>
      </div>
    </div>
  );
}
