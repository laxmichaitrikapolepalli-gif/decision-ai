import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';
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
      await apiService.verifyOTP(otp.join(''));
      toast.success('OTP code verified!');
      navigate('/reset-password');
    } catch (err) {
      toast.error('Invalid OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card glow className="p-8 border-indigo-500/30 shadow-2xl">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          OTP Security Code
        </h2>
        <p className="text-xs text-slate-400">
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
              className="w-10 h-12 text-center text-lg font-bold font-mono rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          ))}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={CheckCircle2}
          className="w-full"
        >
          Verify OTP Code
        </Button>
      </form>

      <p className="text-center text-xs text-slate-400 mt-6">
        Didn't receive the code?{' '}
        <button onClick={() => toast.success('New OTP code dispatched.')} className="text-indigo-400 font-bold hover:underline">
          Resend Token
        </button>
      </p>
    </Card>
  );
};
