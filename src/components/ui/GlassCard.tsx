import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'purple' | 'cyan' | 'none';
  delay?: number;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = 'none',
  delay = 0,
}: GlassCardProps) {
  const glowStyles = {
    purple: 'hover:shadow-glow-purple',
    cyan: 'hover:shadow-glow-cyan',
    none: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`glass-card rounded-2xl ${hover ? 'cursor-pointer' : ''} ${glowStyles[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
