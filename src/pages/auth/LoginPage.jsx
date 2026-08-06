import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

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
    <Card glow className="p-8 border-indigo-500/30 shadow-2xl">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
          Welcome Back
        </h2>
        <p className="text-xs text-slate-400">
          Access your enterprise AI decision workspace
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Work Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
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
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-slate-900 border-slate-800 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Remember me for 30 days</span>
          </label>
          <Link to="/forgot-password" className="text-indigo-400 font-semibold hover:underline">
            Forgot password?
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
          Sign In to DecisionSphere
        </Button>
      </form>

      <p className="text-center text-xs text-slate-400 mt-6">
        Don't have an enterprise account?{' '}
        <Link to="/signup" className="text-indigo-400 font-bold hover:underline">
          Start Free Trial
        </Link>
      </p>
    </Card>
  );
};
