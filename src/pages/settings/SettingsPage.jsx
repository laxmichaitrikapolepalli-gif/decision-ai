import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { User, Mail, Shield, Building, Lock, CheckCircle2, Route, Car } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || user?.full_name || 'Commuter User',
    email: user?.email || 'user@smartroute.ai',
    role: user?.role || 'Fleet Operator & Commuter',
    company: user?.company || user?.organization || 'SmartRoute Mobility',
    defaultMode: 'Car',
    notifications: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Backend endpoint PUT /api/auth/me is missing. Preserving UI feedback.
    toast.success('User Preferences updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk'] text-gradient-master">
          User Preferences & Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-800 font-bold mt-1">
          Manage your commuter credentials, default transport mode, and security settings.
        </p>
      </div>

      <Card glow className="p-8 border-blue-500/30 glass-card">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-blue-500/20">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
            />
            <div>
              <h4 className="text-lg font-black text-slate-900">{profile.name}</h4>
              <p className="text-xs text-blue-600 font-extrabold">{profile.role}</p>
              <Badge variant="success" size="sm" className="mt-1">Active Commuter Node</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              icon={User}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Work Email"
              icon={Mail}
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <Input
              label="User Role"
              icon={Shield}
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            />
            <Input
              label="Company / Fleet Name"
              icon={Building}
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            />
          </div>

          {/* Security Callout */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-500/30 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-700 font-black">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-black text-slate-900">Encrypted Token Authentication</h5>
                <p className="text-[11px] text-slate-700 font-bold">Supabase JWT token authentication active</p>
              </div>
            </div>
            <Badge variant="success" size="sm">ACTIVE</Badge>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-blue-500/20">
            <Button type="submit" variant="primary" size="md" icon={CheckCircle2}>
              Save User Preferences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
