import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, LogIn, Route } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@smartroute.ai');
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
    <Card glow className="p-8 border-blue-500/30 shadow-2xl">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
          <Route className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
          Welcome Back
        </h2>
        <p className="text-xs text-slate-700 font-bold">
          Access your Smart Mobility Dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Work Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="sarah@smartroute.ai"
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
          <label className="flex items-center gap-2 text-slate-700 font-semibold cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            Remember Device
          </label>
          <Link to="/forgot-password" className="text-blue-600 font-bold hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={LogIn}
          className="w-full mt-2"
        >
          Sign In to SmartRoute AI
        </Button>
      </form>

      <p className="text-center text-xs text-slate-700 font-bold mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 font-black hover:underline">
          Create Account
        </Link>
      </p>
    </Card>
  );
};
