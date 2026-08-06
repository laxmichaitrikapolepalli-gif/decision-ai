import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, ArrowLeft, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Backend endpoint POST /api/auth/forgot-password is missing. Preserving UI behavior.
      toast.success('Verification code sent to your email.');
      navigate('/otp-verify');
    } catch (err) {
      toast.error('Failed to send reset code.');
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
          Reset Password
        </h2>
        <p className="text-sm text-[#64748B] font-semibold">
          Enter your registered work email to receive a 6-digit OTP code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Work Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="sarah@decisionsphere.ai"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={Send}
          className="w-full mt-2 bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none font-bold shadow-lg"
        >
          Send Verification OTP
        </Button>
      </form>

      <div className="text-center mt-6">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#6C63FF] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </Card>
  );
};
