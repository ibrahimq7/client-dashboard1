import { motion } from 'framer-motion';
import { usePortal } from '../../context/PortalContext';
import { useSubmitPortal } from '../../hooks/useSubmitPortal';
import { FileText, Building2, Package, Users, Target, Zap, Check, AlertTriangle, ArrowRight, Download } from 'lucide-react';

export default function ExecutiveSummarySection() {
  const { state, calculateOverallProgress, updateNotes } = usePortal();
  const { businessInfo, productInfo, customerExperience, growthStrategy, projectPriorities, notes } = state;
  const { isSubmitting, submitSuccess, submitError, submitMessage, submit } = useSubmitPortal();

  const getRecommendation = () => {
    const topPriority = projectPriorities[0]?.id;
    const isComplex = productInfo.productCount === 'enterprise' || productInfo.productCount === 'large' || growthStrategy.expansionCountries.length > 3 || Object.values(customerExperience).filter(Boolean).length > 7;

    if (topPriority === 'speed' && !isComplex) return { platform: 'managed', reason: 'Your priority on launch speed and straightforward requirements suggest a Managed Platform.', considerations: ['Consider platform limitations', 'Plan for future migration'] };
    if (topPriority === 'custom' || topPriority === 'premium' || isComplex) return { platform: 'enterprise', reason: 'Your focus on customization and complex requirements indicate an Enterprise Platform.', considerations: ['Higher investment required', 'Extended timeline', 'Ongoing development resources'] };
    if (topPriority === 'budget' && !isComplex) return { platform: 'managed', reason: 'With budget as top priority, a Managed Platform offers best value.', considerations: ['Evaluate platform fees over time', 'Consider transaction costs'] };
    return { platform: growthStrategy.expansionCountries.length > 2 || productInfo.productCount === 'enterprise' ? 'enterprise' : 'managed', reason: 'Both options viable. Detailed analysis needed.', considerations: ['Schedule consultation', 'Review integration requirements'] };
  };

  const recommendation = getRecommendation();
  const stageConfig: Record<string, { label: string; color: string }> = { initial: { label: 'Initial', color: '#94a3b8' }, developing: { label: 'Developing', color: '#fbbf24' }, advanced: { label: 'Advanced', color: '#22d3ee' }, project_ready: { label: 'Project Ready', color: '#22c55e' } };
  const progress = calculateOverallProgress();

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Executive Summary Report</h2>
        <p className="text-slate-400">Comprehensive overview and strategic recommendation.</p>
      </motion.div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 p-8 border-b border-white/10">
          <p className="text-violet-400 text-sm uppercase tracking-wider mb-2">Commerce Strategy Portal</p>
          <h3 className="text-4xl font-bold text-white mb-2">{businessInfo.companyName || 'Company'} Commerce Platform</h3>
          <p className="text-slate-400">Executive Project Report - {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center"><FileText className="w-5 h-5 text-emerald-400" /></div>
          <div><h3 className="text-white font-medium">Project Readiness</h3></div>
        </div>
        <div className="px-6 py-3 rounded-full inline-block" style={{ backgroundColor: `${stageConfig[progress].color}20`, border: `1px solid ${stageConfig[progress].color}` }}>
          <span className="text-lg font-semibold" style={{ color: stageConfig[progress].color }}>{stageConfig[progress].label}</span>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center"><Building2 className="w-5 h-5 text-violet-400" /></div>
          <h3 className="text-xl font-semibold text-white">Business Overview</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><p className="text-slate-400 text-sm font-semibold">Company</p><p className="text-slate-200">{businessInfo.companyName || 'Not specified'}</p></div>
          <div><p className="text-slate-400 text-sm font-semibold">Industry</p><p className="text-slate-200">{businessInfo.industry || 'Not specified'}</p></div>
          <div><p className="text-slate-400 text-sm font-semibold">Model</p><p className="text-slate-200">{businessInfo.businessModel?.toUpperCase() || 'N/A'}</p></div>
          <div><p className="text-slate-400 text-sm font-semibold">Target Markets</p><p className="text-slate-200">{businessInfo.targetGCCMarkets.length} markets</p></div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><Package className="w-5 h-5 text-cyan-400" /></div>
          <h3 className="text-xl font-semibold text-white">Catalog Requirements</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="glass rounded-xl p-4 text-center"><p className="text-slate-400 text-sm font-semibold">Count</p><p className="text-xl text-slate-200">{productInfo.productCount === 'enterprise' ? '10K+' : productInfo.productCount === 'large' ? '1K-10K' : productInfo.productCount === 'medium' ? '100-1K' : '<100'}</p></div>
          <div className="glass rounded-xl p-4 text-center"><p className="text-slate-400 text-sm font-semibold">Categories</p><p className="text-xl text-slate-200">{productInfo.productCategories.length}</p></div>
          <div className="glass rounded-xl p-4 text-center"><p className="text-slate-400 text-sm font-semibold">Colors</p><p className="text-xl text-slate-200">{productInfo.hasColorVariations ? 'Yes' : 'No'}</p></div>
          <div className="glass rounded-xl p-4 text-center"><p className="text-slate-400 text-sm font-semibold">Sizes</p><p className="text-xl text-slate-200">{productInfo.hasSizeVariations ? 'Yes' : 'No'}</p></div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Users className="w-5 h-5 text-purple-400" /></div>
          <h3 className="text-xl font-semibold text-white">Customer Experience</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(customerExperience).map(([key, value]) => (
            <div key={key} className={`flex items-center gap-2 p-2 rounded-lg ${value ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-slate-500'}`}><Check className="w-4 h-4" /><span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span></div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center"><Target className="w-5 h-5 text-amber-400" /></div>
          <h3 className="text-xl font-semibold text-white">Top Priorities</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {projectPriorities.slice(0, 5).map((p, i) => (
            <div key={p.id} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${i === 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/10 text-slate-300'}`}><span className="font-bold">{i + 1}</span><span>{p.name}</span></div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-2xl overflow-hidden">
        <div className={`p-6 ${recommendation.platform === 'enterprise' ? 'bg-violet-600/30' : 'bg-cyan-600/30'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${recommendation.platform === 'enterprise' ? 'bg-violet-500/30' : 'bg-cyan-500/30'}`}>
              {recommendation.platform === 'enterprise' ? <Building2 className="w-7 h-7 text-violet-300" /> : <Zap className="w-7 h-7 text-cyan-300" />}
            </div>
            <div>
              <p className="text-slate-400 text-sm uppercase tracking-wider">Recommended Direction</p>
              <h3 className="text-2xl font-bold text-white">{recommendation.platform === 'enterprise' ? 'Enterprise Custom Platform' : 'Managed Commerce Platform'}</h3>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div><h4 className="text-white font-medium mb-2 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-violet-400" />Rationale</h4><p className="text-slate-400">{recommendation.reason}</p></div>
          <div><h4 className="text-white font-medium mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" />Considerations</h4><ul className="space-y-1">{recommendation.considerations.map((c) => <li key={c} className="flex items-center gap-2 text-slate-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{c}</li>)}</ul></div>
        </div>
      </motion.div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-white font-semibold">Submission Notes</h3>
            <p className="text-slate-500 text-sm">Add any final details you want included in the submitted portal payload.</p>
          </div>
        </div>
        <textarea
          value={notes}
          onChange={(event) => updateNotes(event.target.value)}
          rows={5}
          className="w-full resize-none rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
          placeholder="Enter any final notes or summary for the portal submission..."
        />
      </div>

      {submitError && <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{submitError}</div>}
      {submitSuccess && <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-200">{submitMessage || 'Submission completed successfully.'}</div>}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2 text-slate-400 max-w-2xl">
          <p className="text-sm">Portal data is saved locally in your browser and can be submitted directly to your configured Google Apps Script endpoint.</p>
          <p className="text-sm">Make sure VITE_GOOGLE_SCRIPT_URL is configured in your environment variables.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={submit} disabled={isSubmitting} className={`px-6 py-3 rounded-xl text-white font-medium transition ${isSubmitting ? 'bg-slate-500 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-400'}`}>
            {isSubmitting ? 'Submitting...' : 'Submit Portal'}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20"><Download className="w-5 h-5" />Download Report</motion.button>
        </div>
      </div>
    </div>
  );
}
