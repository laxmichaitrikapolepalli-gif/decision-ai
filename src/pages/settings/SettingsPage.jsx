import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { User, Mail, Shield, Building, Lock, CheckCircle2, Key, CreditCard, Sun, Bell, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: user?.name || user?.full_name || 'Dr. Sarah Vance',
    email: user?.email || 'sarah@decisionsphere.ai',
    role: user?.role || 'Chief Decision Architect',
    company: user?.company || user?.organization || 'AeroTech Dynamics',
    apiKey: 'ds_live_pk_994828172948192849182',
    mfaEnabled: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Platform Settings updated successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'apikeys', label: 'API Keys', icon: Key },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'theme', label: 'Theme', icon: Sun },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'mfa', label: 'MFA', icon: Smartphone },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk'] text-gradient-master">
          Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] font-semibold mt-1">
          Manage executive credentials, security rules, API keys, billing plans, themes, notifications, and multi-factor authentication
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#6C63FF]/20 shadow-sm overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white shadow-md'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <Card glow className="p-8 border-[#6C63FF]/20 glass-card bg-white/95 rounded-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"}
                  alt="Avatar"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#6C63FF] shadow-md"
                />
                <div>
                  <h4 className="text-lg font-black text-[#0F172A]">{profile.name}</h4>
                  <p className="text-xs text-[#6C63FF] font-black">{profile.role}</p>
                  <Badge variant="success" size="sm" className="mt-1">Active Neural Node</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" icon={User} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                <Input label="Work Email" icon={Mail} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                <Input label="User Role" icon={Shield} value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} />
                <Input label="Organization" icon={Building} value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} />
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#0F172A]">Encryption & JWT Security</h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-black text-[#0F172A]">Supabase JWT Bearer Interceptor</h5>
                  <p className="text-xs text-[#64748B] font-semibold">Automatic token attachment on all protected requests</p>
                </div>
                <Badge variant="success" size="sm">ACTIVE</Badge>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'apikeys' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#0F172A]">Enterprise API Keys</h3>
              <Input label="Live Production Secret Key" icon={Key} value={profile.apiKey} readOnly />
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#0F172A]">Current Subscription Plan</h3>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-[#0F172A]">Enterprise AI Annual Plan</h4>
                  <p className="text-xs text-[#64748B] font-semibold">$399 / user / month (20% Discount Active)</p>
                </div>
                <Badge variant="primary" size="md" className="bg-[#6C63FF]/15 text-[#6C63FF]">Active</Badge>
              </div>
            </div>
          )}

          {/* Theme Tab */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#0F172A]">Appearance & Color Mode</h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A]">Platform Theme Accent</span>
                <Badge variant="accent" size="md">Ultra-Luxurious Light (#F8F7FC)</Badge>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#0F172A]">Notification Alerts</h3>
              <label className="flex items-center gap-3 text-xs font-bold text-[#0F172A] cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#6C63FF]" />
                Receive email digest for high-confidence risk alerts and P95 variance updates
              </label>
            </div>
          )}

          {/* MFA Tab */}
          {activeTab === 'mfa' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#0F172A]">Multi-Factor Authentication (MFA)</h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-[#10B981]" />
                  <div>
                    <h5 className="text-xs font-black text-[#0F172A]">TOTP Authenticator App</h5>
                    <p className="text-xs text-[#64748B] font-semibold">2FA verification active for executive login</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">ENABLED</Badge>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <Button type="submit" variant="primary" size="md" icon={CheckCircle2} className="bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold border-none shadow-md">
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
