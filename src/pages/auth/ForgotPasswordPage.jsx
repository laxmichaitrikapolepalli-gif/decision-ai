import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { apiService } from '../../services/api';
import toast from 'react-hot-toast';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.forgotPassword(email);
      toast.success('Verification code sent to your email.');
      navigate('/otp-verify');
    } catch (err) {
      toast.error('Failed to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card glow className="p-8 border-indigo-500/30 shadow-2xl">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Reset Password
        </h2>
        <p className="text-xs text-slate-400">
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
          placeholder="sarah@company.com"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={Send}
          className="w-full mt-2"
        >
          Send Verification OTP
        </Button>
      </form>

      <div className="text-center mt-6">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </Card>
  );
};
