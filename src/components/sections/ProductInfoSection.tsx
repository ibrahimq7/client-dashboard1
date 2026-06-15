import { motion } from 'framer-motion';
import { usePortal } from '../../context/PortalContext';
import { Hash, Layers, Palette, Ruler, Sparkles, TrendingUp, Warehouse } from 'lucide-react';

const countRanges = [{ id: 'small', label: '<100' }, { id: 'medium', label: '100-1K' }, { id: 'large', label: '1K-10K' }, { id: 'enterprise', label: '10K+' }];
const categories = ['Clothing', 'Electronics', 'Home & Living', 'Beauty', 'Sports', 'Food', 'Health', 'Books', 'Toys', 'Automotive', 'Jewelry', 'Furniture'];
const expansionPlans = [{ id: 'steady', label: 'Steady Growth' }, { id: 'aggressive', label: 'Aggressive Expansion' }, { id: 'seasonal', label: 'Seasonal Focus' }, { id: 'stable', label: 'Stable Catalog' }];

export default function ProductInfoSection() {
  const { state, updateProductInfo } = usePortal();
  const { productInfo } = state;

  const toggleCategory = (cat: string) => updateProductInfo({ productCategories: productInfo.productCategories.includes(cat) ? productInfo.productCategories.filter(c => c !== cat) : [...productInfo.productCategories, cat] });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Product Information</h2>
        <p className="text-slate-400">Understanding your product catalog helps determine the right approach.</p>
      </motion.div>

      {/* Product Count */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center"><Hash className="w-5 h-5 text-violet-400" /></div>
          <div><h3 className="text-white font-medium">Product Count</h3><p className="text-slate-500 text-sm">How many products?</p></div>
        </div>
        <div className="grid grid-cols-4 gap-4">{countRanges.map((range) => <motion.button key={range.id} onClick={() => updateProductInfo({ productCount: range.id })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border text-center ${productInfo.productCount === range.id ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><span className={`text-xl font-bold ${productInfo.productCount === range.id ? 'text-violet-400' : 'text-white'}`}>{range.label}</span></motion.button>)}</div>
      </div>

      {/* Categories */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><Layers className="w-5 h-5 text-cyan-400" /></div>
          <div><h3 className="text-white font-medium">Product Categories</h3><p className="text-slate-500 text-sm">Select all that apply</p></div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">{categories.map((cat) => <motion.button key={cat} onClick={() => toggleCategory(cat)} whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl border ${productInfo.productCategories.includes(cat) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><span className={`text-sm ${productInfo.productCategories.includes(cat) ? 'text-violet-400' : 'text-slate-300'}`}>{cat}</span></motion.button>)}</div>
      </div>

      {/* Variants */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Palette className="w-5 h-5 text-purple-400" /></div>
          <div><h3 className="text-white font-medium">Product Variations</h3><p className="text-slate-500 text-sm">Do products have variations?</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'hasColorVariations', label: 'Color Variations', icon: Palette },
            { key: 'hasSizeVariations', label: 'Size Variations', icon: Ruler },
          ].map(({ key, label, icon: Icon }) => (
            <motion.button key={key} onClick={() => updateProductInfo({ [key]: !productInfo[key as keyof typeof productInfo] })} whileHover={{ scale: 1.02 }} className={`p-5 rounded-xl border flex items-center justify-between ${productInfo[key as keyof typeof productInfo] ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
              <div className="flex items-center gap-3"><Icon className={`w-5 h-5 ${productInfo[key as keyof typeof productInfo] ? 'text-violet-400' : 'text-slate-500'}`} /><span className={`font-medium ${productInfo[key as keyof typeof productInfo] ? 'text-violet-400' : 'text-white'}`}>{label}</span></div>
              <div className={`w-12 h-7 rounded-full transition-all ${productInfo[key as keyof typeof productInfo] ? 'bg-violet-500' : 'bg-white/10'}`}><motion.div className="w-5 h-5 bg-white rounded-full mt-1 shadow-lg" animate={{ x: productInfo[key as keyof typeof productInfo] ? 24 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} /></div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center"><Sparkles className="w-5 h-5 text-amber-400" /></div>
          <div><h3 className="text-white font-medium">Brand Management</h3><p className="text-slate-500 text-sm">Multiple brands?</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <motion.button onClick={() => updateProductInfo({ hasBrands: true })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border ${productInfo.hasBrands ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>Yes, Multiple Brands</motion.button>
          <motion.button onClick={() => updateProductInfo({ hasBrands: false })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border ${!productInfo.hasBrands ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>Single Brand</motion.button>
        </div>
      </div>

      {/* Expansion */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-400" /></div>
          <div><h3 className="text-white font-medium">Catalog Growth</h3><p className="text-slate-500 text-sm">Expansion plans?</p></div>
        </div>
        <div className="grid grid-cols-4 gap-4">{expansionPlans.map((plan) => <motion.button key={plan.id} onClick={() => updateProductInfo({ futureExpansion: plan.id })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border text-center ${productInfo.futureExpansion === plan.id ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><span className={`font-medium ${productInfo.futureExpansion === plan.id ? 'text-violet-400' : 'text-white'}`}>{plan.label}</span></motion.button>)}</div>
      </div>

      {/* Insight */}
      {(productInfo.productCount === 'large' || productInfo.productCount === 'enterprise') && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5 border-l-4 border-amber-500">
          <div className="flex items-start gap-3"><Warehouse className="w-5 h-5 text-amber-400" /><div><h4 className="text-amber-400 font-medium">Complex Product Catalog Detected</h4><p className="text-slate-400 text-sm mt-1">Advanced product management and inventory tracking capabilities recommended.</p></div></div>
        </motion.div>
      )}
    </div>
  );
}
