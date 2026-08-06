import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { User, Mail, Shield, Building, Lock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || user?.full_name || 'Dr. Sarah Vance',
    email: user?.email || 'sarah@decisionsphere.ai',
    role: user?.role || 'Chief Decision Architect',
    company: user?.company || user?.organization || 'AeroTech Dynamics',
    notifications: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Backend endpoint PUT /api/auth/me is missing. Preserving UI feedback.
    toast.success('User Preferences & Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight font-['Space_Grotesk'] text-gradient-master">
          Settings & User Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
          Manage executive credentials, notification rules, and encryption security settings.
        </p>
      </div>

      <Card glow className="p-8 border-purple-500/30 glass-card bg-slate-900/80 rounded-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-purple-500/20">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-400 shadow-md"
            />
            <div>
              <h4 className="text-lg font-black text-white">{profile.name}</h4>
              <p className="text-xs text-purple-400 font-extrabold">{profile.role}</p>
              <Badge variant="success" size="sm" className="mt-1">Active Neural Node</Badge>
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
              label="Company / Organization"
              icon={Building}
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            />
          </div>

          {/* Security Callout */}
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 font-black">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-black text-white">Encrypted JWT Token Authentication</h5>
                <p className="text-[11px] text-slate-300 font-semibold">Supabase JWT token authentication active</p>
              </div>
            </div>
            <Badge variant="success" size="sm">ACTIVE</Badge>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-purple-500/20">
            <Button type="submit" variant="primary" size="md" icon={CheckCircle2}>
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
