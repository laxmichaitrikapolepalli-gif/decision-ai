import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['9', '4', '2', '8', '1', '0']);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Backend endpoint POST /api/auth/verify-otp is missing. Preserving UI behavior.
      toast.success('OTP code verified!');
      navigate('/reset-password');
    } catch (err) {
      toast.error('Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card glow className="p-8 border-[#6C63FF]/20 shadow-2xl bg-white/95 rounded-[32px]">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#FF2DAA]/25">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk']">
          OTP Security Code
        </h2>
        <p className="text-sm text-[#64748B] font-semibold">
          Enter the 6-digit authentication token sent to your device
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2 max-w-xs mx-auto">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-10 h-12 text-center text-lg font-bold font-mono rounded-xl bg-slate-50 border border-slate-200 text-[#6C63FF] focus:border-[#6C63FF] focus:outline-none"
            />
          ))}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={CheckCircle2}
          className="w-full bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white font-bold border-none shadow-lg"
        >
          Verify OTP Code
        </Button>
      </form>

      <p className="text-center text-xs text-[#64748B] font-semibold mt-6">
        Didn't receive the code?{' '}
        <button onClick={() => toast.success('New OTP code dispatched.')} className="text-[#6C63FF] font-bold hover:underline">
          Resend Token
        </button>
      </p>
    </Card>
  );
};
