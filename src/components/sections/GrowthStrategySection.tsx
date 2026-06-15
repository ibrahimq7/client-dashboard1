import { motion } from 'framer-motion';
import { usePortal } from '../../context/PortalContext';
import { Globe2, Smartphone, Store, Link2, Users, ArrowRight } from 'lucide-react';

const countries = [{ id: 'SA', label: 'Saudi Arabia', flag: 'SA' }, { id: 'AE', label: 'UAE', flag: 'AE' }, { id: 'QA', label: 'Qatar', flag: 'QA' }, { id: 'OM', label: 'Oman', flag: 'OM' }, { id: 'BH', label: 'Bahrain', flag: 'BH' }, { id: 'KW', label: 'Kuwait', flag: 'KW' }, { id: 'EG', label: 'Egypt', flag: 'EG' }, { id: 'INTL', label: 'International', flag: '🌍' }];
const marketplaces = [{ id: 'amazon', label: 'Amazon' }, { id: 'noon', label: 'Noon' }, { id: 'jarir', label: 'Jarir' }, { id: 'extra', label: 'Extra' }];
const erps = ['SAP', 'Oracle', 'Microsoft Dynamics', 'Zoho', 'Odoo', 'Custom'];
const crms = ['Salesforce', 'HubSpot', 'Zoho CRM', 'Custom'];

export default function GrowthStrategySection() {
  const { state, updateGrowthStrategy } = usePortal();
  const { growthStrategy } = state;

  const toggleCountry = (id: string) => updateGrowthStrategy({ expansionCountries: growthStrategy.expansionCountries.includes(id) ? growthStrategy.expansionCountries.filter(c => c !== id) : [...growthStrategy.expansionCountries, id] });
  const toggleMarketplace = (id: string) => updateGrowthStrategy({ marketplaceExpansion: growthStrategy.marketplaceExpansion.includes(id) ? growthStrategy.marketplaceExpansion.filter(m => m !== id) : [...growthStrategy.marketplaceExpansion, id] });
  const toggleErp = (name: string) => updateGrowthStrategy({ erpIntegrations: growthStrategy.erpIntegrations.includes(name) ? growthStrategy.erpIntegrations.filter(e => e !== name) : [...growthStrategy.erpIntegrations, name] });
  const toggleCrm = (name: string) => updateGrowthStrategy({ crmIntegrations: growthStrategy.crmIntegrations.includes(name) ? growthStrategy.crmIntegrations.filter(c => c !== name) : [...growthStrategy.crmIntegrations, name] });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Growth Strategy</h2>
        <p className="text-slate-400">Plan for the future with a scalable foundation.</p>
      </motion.div>

      {/* Future Markets */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center"><Globe2 className="w-5 h-5 text-violet-400" /></div>
          <div><h3 className="text-white font-medium">Future Market Expansion</h3></div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">{countries.map((country) => <motion.button key={country.id} onClick={() => toggleCountry(country.id)} whileHover={{ scale: 1.05 }} className={`p-3 rounded-xl border text-center ${growthStrategy.expansionCountries.includes(country.id) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><span className="text-lg block mb-1">{country.flag}</span><span className={`text-xs ${growthStrategy.expansionCountries.includes(country.id) ? 'text-violet-400' : 'text-slate-400'}`}>{country.label}</span></motion.button>)}</div>
      </div>

      {/* Mobile App */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><Smartphone className="w-5 h-5 text-cyan-400" /></div>
          <div><h3 className="text-white font-medium">Mobile Application Plans</h3></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <motion.button onClick={() => updateGrowthStrategy({ mobileApp: true })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border ${growthStrategy.mobileApp ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}><Smartphone className={`w-5 h-5 mb-2 ${growthStrategy.mobileApp ? 'text-violet-400' : 'text-slate-500'}`} /><span className={`font-medium ${growthStrategy.mobileApp ? 'text-violet-400' : 'text-white'}`}>Yes, planning app</span></motion.button>
          <motion.button onClick={() => updateGrowthStrategy({ mobileApp: false })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border ${!growthStrategy.mobileApp ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}><Globe2 className={`w-5 h-5 mb-2 ${!growthStrategy.mobileApp ? 'text-violet-400' : 'text-slate-500'}`} /><span className={`font-medium ${!growthStrategy.mobileApp ? 'text-violet-400' : 'text-white'}`}>Web-only for now</span></motion.button>
        </div>
        {growthStrategy.mobileApp && (
          <div className="grid grid-cols-4 gap-3">{['3-6 months', '6-12 months', '1-2 years', 'Later'].map((timeline) => <motion.button key={timeline} onClick={() => updateGrowthStrategy({ mobileAppTimeline: timeline })} whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl border ${growthStrategy.mobileAppTimeline === timeline ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}><span className={`text-sm ${growthStrategy.mobileAppTimeline === timeline ? 'text-violet-400' : 'text-white'}`}>{timeline}</span></motion.button>)}</div>
        )}
      </div>

      {/* Marketplace Expansion */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center"><Store className="w-5 h-5 text-amber-400" /></div>
          <div><h3 className="text-white font-medium">Marketplace Expansion</h3></div>
        </div>
        <div className="grid grid-cols-4 gap-4">{marketplaces.map((mp) => <motion.button key={mp.id} onClick={() => toggleMarketplace(mp.id)} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border text-center ${growthStrategy.marketplaceExpansion.includes(mp.id) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}><Store className={`w-5 h-5 mx-auto mb-2 ${growthStrategy.marketplaceExpansion.includes(mp.id) ? 'text-violet-400' : 'text-slate-500'}`} /><span className={`font-medium ${growthStrategy.marketplaceExpansion.includes(mp.id) ? 'text-violet-400' : 'text-white'}`}>{mp.label}</span></motion.button>)}</div>
      </div>

      {/* Integrations */}
      <div className="grid grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center"><Link2 className="w-5 h-5 text-emerald-400" /></div>
            <div><h3 className="text-white font-medium">ERP Integration</h3></div>
          </div>
          <div className="grid grid-cols-2 gap-2">{erps.map((erp) => <motion.button key={erp} onClick={() => toggleErp(erp)} whileHover={{ scale: 1.02 }} className={`p-2 rounded-lg border text-center ${growthStrategy.erpIntegrations.includes(erp) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}><span className={`text-xs ${growthStrategy.erpIntegrations.includes(erp) ? 'text-violet-400' : 'text-white'}`}>{erp}</span></motion.button>)}</div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Users className="w-5 h-5 text-purple-400" /></div>
            <div><h3 className="text-white font-medium">CRM Integration</h3></div>
          </div>
          <div className="grid grid-cols-2 gap-2">{crms.map((crm) => <motion.button key={crm} onClick={() => toggleCrm(crm)} whileHover={{ scale: 1.02 }} className={`p-2 rounded-lg border text-center ${growthStrategy.crmIntegrations.includes(crm) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}><span className={`text-xs ${growthStrategy.crmIntegrations.includes(crm) ? 'text-violet-400' : 'text-white'}`}>{crm}</span></motion.button>)}</div>
        </div>
      </div>

      {growthStrategy.expansionCountries.length > 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5 border-l-4 border-violet-500">
          <div className="flex items-start gap-3"><ArrowRight className="w-5 h-5 text-violet-400" /><div><h4 className="text-violet-400 font-medium">High Growth Potential Detected</h4><p className="text-slate-400 text-sm mt-1">Build with scalability and localization from the start.</p></div></div>
        </motion.div>
      )}
    </div>
  );
}
