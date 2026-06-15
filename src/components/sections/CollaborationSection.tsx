import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { MessageSquare, HelpCircle, FileText, AlertCircle, Lightbulb, Send, Clock, X } from 'lucide-react';
import { CollaborationItem } from '../../types';

const types = [
  { id: 'question', label: 'Question', icon: HelpCircle, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { id: 'note', label: 'Note', icon: FileText, color: 'text-violet-400', bg: 'bg-violet-500/20' },
  { id: 'clarification', label: 'Clarification', icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { id: 'change_request', label: 'Change Request', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
  { id: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
];

const sections = [
  { id: 'business', label: 'Business Information' },
  { id: 'product', label: 'Product Information' },
  { id: 'customer', label: 'Customer Experience' },
  { id: 'platform', label: 'Platform Strategy' },
  { id: 'general', label: 'General' },
];

export default function CollaborationSection() {
  const { state, addCollaborationItem } = usePortal();
  const { collaborationItems } = state;
  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState('question');
  const [newSection, setNewSection] = useState('general');
  const [newContent, setNewContent] = useState('');

  const handleSubmit = () => {
    if (!newContent.trim()) return;
    addCollaborationItem({ type: newType as CollaborationItem['type'], content: newContent, section: newSection });
    setNewContent('');
    setIsAdding(false);
  };

  const getType = (type: string) => types.find(t => t.id === type) || types[0];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Project Collaboration Center</h2>
        <p className="text-slate-400">Communicate with your development team.</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {[{ label: 'Total', value: collaborationItems.length, color: 'violet' }, { label: 'Open', value: collaborationItems.filter(i => !i.resolved).length, color: 'amber' }, { label: 'Resolved', value: collaborationItems.filter(i => i.resolved).length, color: 'emerald' }].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-4">
            <p className="text-slate-500 text-sm">{stat.label}</p>
            <p className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>{isAdding ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">New Discussion</h3>
            <button onClick={() => setIsAdding(false)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"><X className="w-4 h-4 text-slate-400" /></button>
          </div>
          <div className="space-y-4">
            <div><label className="text-slate-400 text-sm mb-2 block">Type</label><div className="flex flex-wrap gap-2">{types.map((t) => <motion.button key={t.id} onClick={() => setNewType(t.id)} whileHover={{ scale: 1.02 }} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${newType === t.id ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}><t.icon className={`w-4 h-4 ${t.color}`} /><span className={`text-sm ${newType === t.id ? 'text-violet-400' : 'text-white'}`}>{t.label}</span></motion.button>)}</div></div>
            <div><label className="text-slate-400 text-sm mb-2 block">Section</label><select value={newSection} onChange={(e) => setNewSection(e.target.value)} className="input-glass">{sections.map((s) => <option key={s.id} value={s.id} className="bg-dark-700">{s.label}</option>)}</select></div>
            <div><label className="text-slate-400 text-sm mb-2 block">Message</label><textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={3} className="input-glass resize-none" placeholder="Type your message..." /></div>
            <div className="flex justify-end gap-3"><button onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white">Cancel</button><motion.button onClick={handleSubmit} whileHover={{ scale: 1.02 }} className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white flex items-center gap-2"><Send className="w-4 h-4" />Submit</motion.button></div>
          </div>
        </motion.div>
      ) : (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setIsAdding(true)} className="w-full glass-card rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-white/10"><MessageSquare className="w-5 h-5 text-violet-400" /><span className="text-white font-medium">Start New Discussion</span></motion.button>
      )}</AnimatePresence>

      <div className="space-y-4">
        {collaborationItems.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center"><MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" /><p className="text-slate-500">No discussions yet.</p></div>
        ) : (
          collaborationItems.map((item, i) => {
            const type = getType(item.type);
            const Icon = type.icon;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card rounded-xl p-5 ${item.resolved ? 'opacity-60' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${type.bg} flex items-center justify-center flex-shrink-0`}><Icon className={`w-5 h-5 ${type.color}`} /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${type.bg} ${type.color}`}>{type.label}</span><span className="text-slate-500 text-xs">{sections.find(s => s.id === item.section)?.label}</span>{item.resolved && <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400">Resolved</span>}</div>
                    <p className="text-white">{item.content}</p>
                    <div className="flex items-center gap-2 text-slate-500 text-xs mt-2"><Clock className="w-3 h-3" />{new Date(item.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
