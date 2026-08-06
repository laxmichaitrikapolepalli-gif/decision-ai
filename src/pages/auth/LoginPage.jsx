import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@decisionsphere.ai');
  const [password, setPassword] = useState('password123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter work email and password.');
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card glow className="p-8 border-[#6C63FF]/20 shadow-2xl bg-white/95 rounded-[32px]">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#FF2DAA]/25">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk']">
          Welcome Back
        </h2>
        <p className="text-sm text-[#64748B] font-medium">
          Access your Decision Intelligence Dashboard
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

        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-[#64748B] font-semibold cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-slate-300 bg-white text-[#6C63FF] focus:ring-[#6C63FF]" />
            Remember Device
          </label>
          <Link to="/forgot-password" className="text-[#6C63FF] font-bold hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={LogIn}
          className="w-full mt-2 bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none shadow-lg shadow-[#6C63FF]/25 font-bold"
        >
          Sign In to DecisionSphere AI
        </Button>
      </form>

      <p className="text-center text-xs text-[#64748B] font-semibold mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="text-[#6C63FF] font-bold hover:underline">
          Create Account
        </Link>
      </p>
    </Card>
  );
};
