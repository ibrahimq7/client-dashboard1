import { motion } from 'framer-motion';
import { usePortal } from '../../context/PortalContext';
import { Search, Filter, Heart, User, Star, Sparkles, Globe, DollarSign, Tag, Gift, Crown, Globe2 } from 'lucide-react';

const features = [
  { id: 'advancedSearch', icon: Search, label: 'Advanced Search' },
  { id: 'productFilters', icon: Filter, label: 'Product Filters' },
  { id: 'wishlist', icon: Heart, label: 'Wishlist' },
  { id: 'customerAccounts', icon: User, label: 'Customer Accounts' },
  { id: 'productReviews', icon: Star, label: 'Product Reviews' },
  { id: 'recommendations', icon: Sparkles, label: 'Recommendations' },
  { id: 'multiLanguage', icon: Globe, label: 'Multi-Language' },
  { id: 'multiCurrency', icon: DollarSign, label: 'Multi-Currency' },
  { id: 'promotions', icon: Tag, label: 'Promotions' },
  { id: 'discountSystems', icon: Gift, label: 'Discount Systems' },
  { id: 'loyaltyPrograms', icon: Crown, label: 'Loyalty Programs' },
];

export default function CustomerExperienceSection() {
  const { state, updateCustomerExperience } = usePortal();
  const { customerExperience } = state;

  const selectedCount = Object.values(customerExperience).filter(Boolean).length;

  const toggleFeature = (id: string) => updateCustomerExperience({ [id]: !customerExperience[id as keyof typeof customerExperience] });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Customer Experience</h2>
        <p className="text-slate-400">Select features for an exceptional shopping experience.</p>
      </motion.div>

      <div className="glass-card rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-violet-400" /><span className="text-white font-medium">Features Selected</span></div>
        <div className="flex items-center gap-2"><span className="text-2xl font-bold text-violet-400">{selectedCount}</span><span className="text-slate-500">/ {features.length}</span></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isSelected = customerExperience[feature.id as keyof typeof customerExperience];
          return (
            <motion.button key={feature.id} onClick={() => toggleFeature(feature.id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.02 }} className={`glass-card rounded-xl p-4 text-center ${isSelected ? 'border-violet-500/50 bg-violet-500/10' : ''}`}>
              <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${isSelected ? 'bg-violet-500/30' : 'bg-white/5'}`}><Icon className={`w-6 h-6 ${isSelected ? 'text-violet-400' : 'text-slate-400'}`} /></div>
              <span className={`text-sm font-medium ${isSelected ? 'text-violet-400' : 'text-white'}`}>{feature.label}</span>
            </motion.button>
          );
        })}
      </div>

      {selectedCount >= 5 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5 border-l-4 border-cyan-500">
          <div className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-cyan-400" /><div><h4 className="text-cyan-400 font-medium">Premium Customer Experience Prioritized</h4><p className="text-slate-400 text-sm mt-1">Consider personalization and ease of use differentiators.</p></div></div>
        </motion.div>
      )}

      {(customerExperience.multiLanguage || customerExperience.multiCurrency) && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5 border-l-4 border-emerald-500">
          <div className="flex items-start gap-3"><Globe2 className="w-5 h-5 text-emerald-400" /><div><h4 className="text-emerald-400 font-medium">International Commerce Requirements</h4><p className="text-slate-400 text-sm mt-1">Regional compliance and localized payments needed.</p></div></div>
        </motion.div>
      )}
    </div>
  );
}
