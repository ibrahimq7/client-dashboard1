import { motion } from 'framer-motion';

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div className="absolute bg-orb bg-orb-purple" style={{ width: '800px', height: '800px', top: '-200px', right: '-200px' }} animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bg-orb bg-orb-cyan" style={{ width: '600px', height: '600px', bottom: '-150px', left: '20%' }} animate={{ x: [0, -30, 0], y: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      <motion.div className="absolute bg-orb bg-orb-indigo" style={{ width: '500px', height: '500px', top: '40%', left: '-100px' }} animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="noise-overlay" />
    </div>
  );
}
