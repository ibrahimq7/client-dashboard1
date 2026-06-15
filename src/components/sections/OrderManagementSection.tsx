import { motion } from 'framer-motion';
import { usePortal } from '../../context/PortalContext';
import { ShoppingCart, Truck, CreditCard, Bell, HeadphonesIcon, ArrowRight, Check } from 'lucide-react';

const orderMethods = [{ id: 'website', label: 'Website Orders' }, { id: 'phone', label: 'Phone Orders' }, { id: 'whatsapp', label: 'WhatsApp' }, { id: 'marketplace', label: 'Marketplace' }];
const deliveryOptions = [{ id: 'own', label: 'Own Fleet' }, { id: 'third_party', label: '3rd Party' }, { id: 'hybrid', label: 'Hybrid' }, { id: 'pickup', label: 'Pickup' }];
const paymentMethods = [{ id: 'cod', label: 'Cash on Delivery', icon: '💵' }, { id: 'cards', label: 'Cards', icon: '💳' }, { id: 'applepay', label: 'Apple Pay', icon: '🍎' }, { id: 'mada', label: 'Mada', icon: '🏦' }, { id: 'tabby', label: 'Tabby', icon: '🛒' }, { id: 'tamara', label: 'Tamara', icon: '💳' }];
const notificationTypes = [{ id: 'email', label: 'Email' }, { id: 'sms', label: 'SMS' }, { id: 'whatsapp', label: 'WhatsApp' }, { id: 'push', label: 'Push' }];
const supportLevels = [{ id: 'basic', label: 'Basic', desc: 'Email only' }, { id: 'standard', label: 'Standard', desc: 'Email + FAQ' }, { id: 'advanced', label: 'Advanced', desc: 'Live chat, help center' }];

export default function OrderManagementSection() {
  const { state, updateOrderManagement } = usePortal();
  const { orderManagement } = state;

  const togglePayment = (id: string) => updateOrderManagement({ paymentMethods: orderManagement.paymentMethods.includes(id) ? orderManagement.paymentMethods.filter(p => p !== id) : [...orderManagement.paymentMethods, id] });
  const toggleNotification = (id: string) => updateOrderManagement({ notifications: orderManagement.notifications.includes(id) ? orderManagement.notifications.filter(n => n !== id) : [...orderManagement.notifications, id] });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Order Management</h2>
        <p className="text-slate-400">How orders are received, processed, and delivered.</p>
      </motion.div>

      {/* Flow Visualization */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[{ label: 'Order Received', icon: ShoppingCart, color: 'violet' }, { label: 'Processing', icon: ShoppingCart, color: 'cyan' }, { label: 'Shipped', icon: Truck, color: 'amber' }, { label: 'Delivered', icon: Check, color: 'emerald' }].map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-${step.color}-500/20`}><step.icon className={`w-7 h-7 text-${step.color}-400`} /></div>
                <span className="text-slate-400 text-sm mt-2">{step.label}</span>
              </div>
              {i < 3 && <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Order Receiving Methods */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center"><ShoppingCart className="w-5 h-5 text-violet-400" /></div>
          <div><h3 className="text-white font-medium">How are orders received?</h3></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{orderMethods.map((method) => <motion.button key={method.id} onClick={() => updateOrderManagement({ orderReceivingMethod: method.id })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border ${orderManagement.orderReceivingMethod === method.id ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><span className={`font-medium ${orderManagement.orderReceivingMethod === method.id ? 'text-violet-400' : 'text-white'}`}>{method.label}</span></motion.button>)}</div>
      </div>

      {/* Delivery Process */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><Truck className="w-5 h-5 text-cyan-400" /></div>
          <div><h3 className="text-white font-medium">Delivery Process</h3></div>
        </div>
        <div className="grid grid-cols-4 gap-4">{deliveryOptions.map((opt) => <motion.button key={opt.id} onClick={() => updateOrderManagement({ deliveryProcess: opt.id })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border text-center ${orderManagement.deliveryProcess === opt.id ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><Truck className={`w-5 h-5 mx-auto mb-2 ${orderManagement.deliveryProcess === opt.id ? 'text-violet-400' : 'text-slate-500'}`} /><span className={`font-medium ${orderManagement.deliveryProcess === opt.id ? 'text-violet-400' : 'text-white'}`}>{opt.label}</span></motion.button>)}</div>
      </div>

      {/* Payment Methods */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center"><CreditCard className="w-5 h-5 text-emerald-400" /></div>
          <div><h3 className="text-white font-medium">Payment Methods</h3></div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">{paymentMethods.map((pm) => <motion.button key={pm.id} onClick={() => togglePayment(pm.id)} whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl border text-center ${orderManagement.paymentMethods.includes(pm.id) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><span className="text-2xl block mb-1">{pm.icon}</span><span className={`text-xs font-medium ${orderManagement.paymentMethods.includes(pm.id) ? 'text-violet-400' : 'text-white'}`}>{pm.label}</span></motion.button>)}</div>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center"><Bell className="w-5 h-5 text-amber-400" /></div>
          <div><h3 className="text-white font-medium">Notifications</h3></div>
        </div>
        <div className="grid grid-cols-4 gap-4">{notificationTypes.map((nt) => <motion.button key={nt.id} onClick={() => toggleNotification(nt.id)} whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl border text-center ${orderManagement.notifications.includes(nt.id) ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><Bell className={`w-4 h-4 mx-auto mb-1 ${orderManagement.notifications.includes(nt.id) ? 'text-violet-400' : 'text-slate-500'}`} /><span className={`text-sm ${orderManagement.notifications.includes(nt.id) ? 'text-violet-400' : 'text-white'}`}>{nt.label}</span></motion.button>)}</div>
      </div>

      {/* Support */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><HeadphonesIcon className="w-5 h-5 text-purple-400" /></div>
          <div><h3 className="text-white font-medium">Customer Support</h3></div>
        </div>
        <div className="grid grid-cols-3 gap-4">{supportLevels.map((level) => <motion.button key={level.id} onClick={() => updateOrderManagement({ customerSupport: level.id })} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border text-center ${orderManagement.customerSupport === level.id ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}><HeadphonesIcon className={`w-5 h-5 mx-auto mb-2 ${orderManagement.customerSupport === level.id ? 'text-violet-400' : 'text-slate-500'}`} /><span className={`font-medium block ${orderManagement.customerSupport === level.id ? 'text-violet-400' : 'text-white'}`}>{level.label}</span><span className="text-slate-500 text-xs">{level.desc}</span></motion.button>)}</div>
      </div>
    </div>
  );
}
