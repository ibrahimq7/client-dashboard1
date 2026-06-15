import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePortal } from '../../context/PortalContext';

const gccCountries = [
  { name: 'Saudi Arabia', cx: 320, cy: 170, rx: 60, ry: 50 },
  { name: 'UAE', cx: 440, cy: 220, rx: 25, ry: 25 },
  { name: 'Qatar', cx: 405, cy: 218, rx: 12, ry: 12 },
  { name: 'Bahrain', cx: 378, cy: 182, rx: 12, ry: 12 },
  { name: 'Oman', cx: 500, cy: 255, rx: 35, ry: 40 },
];

export default function HeroSection() {
  const { setCurrentSection } = usePortal();
  const [activeCountries, setActiveCountries] = useState<string[]>([]);

  useEffect(() => {
    gccCountries.forEach((country, index) => {
      setTimeout(() => setActiveCountries(prev => [...prev, country.name]), index * 200);
    });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-violet-400 text-sm font-medium">Enterprise Commerce Planning</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Commerce Strategy</span><br /><span className="text-white">Portal</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          A structured planning experience designed to transform business ideas into scalable commerce platforms. Built for businesses across Saudi Arabia, UAE, Qatar, Oman, and Bahrain.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-12">
          <svg viewBox="0 0 700 400" className="w-full max-w-lg mx-auto">
            <defs>
              <radialGradient id="glow"><stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
              <linearGradient id="countryFill" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" /><stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" /></linearGradient>
            </defs>
            {gccCountries.map((country) => (
              <g key={country.name}>
                <motion.ellipse cx={country.cx} cy={country.cy} rx={activeCountries.includes(country.name) ? 80 : 0} ry={activeCountries.includes(country.name) ? 60 : 0} fill="url(#glow)" initial={{ opacity: 0 }} animate={{ opacity: activeCountries.includes(country.name) ? 0.5 : 0 }} />
                <motion.ellipse cx={country.cx} cy={country.cy} rx={country.rx} ry={country.ry} fill={activeCountries.includes(country.name) ? 'url(#countryFill)' : 'rgba(255,255,255,0.05)'} stroke={activeCountries.includes(country.name) ? 'rgba(139, 92, 246, 0.8)' : 'rgba(255,255,255,0.1)'} strokeWidth="1" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} />
                {activeCountries.includes(country.name) && <motion.text x={country.cx} y={country.cy + country.ry + 20} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{country.name}</motion.text>}
              </g>
            ))}
          </svg>
        </motion.div>

        <motion.button onClick={() => setCurrentSection(0)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50">
          Begin Planning Experience
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
