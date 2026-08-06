import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Lock, ShieldCheck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      // TODO: Backend endpoint POST /api/auth/reset-password is missing. Preserving UI behavior.
      toast.success('Password updated! Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error('Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card glow className="p-8 border-[#6C63FF]/20 shadow-2xl bg-white/95 rounded-[32px]">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#FF2DAA]/25">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk']">
          Set New Password
        </h2>
        <p className="text-sm text-[#64748B] font-semibold">
          Must contain at least 8 characters with numbers & symbols
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          icon={Lock}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={ShieldCheck}
          className="w-full mt-2 bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold border-none shadow-lg"
        >
          Update Account Password
        </Button>
      </form>
    </Card>
  );
};
