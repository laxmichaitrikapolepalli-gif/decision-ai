import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Mail, Lock, Building, Sparkles, Route } from 'lucide-react';

export const SignupPage = () => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    agreeTerms: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);
    if (success) navigate('/dashboard');
  };

  return (
    <Card glow className="p-8 border-blue-500/30 shadow-2xl">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
          <Route className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
          Create Your Account
        </h2>
        <p className="text-xs text-slate-700 font-bold">
          Get started with SmartRoute AI Platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Full Name"
          type="text"
          icon={User}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Sarah Vance"
          required
        />

        <Input
          label="Work Email"
          type="email"
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="sarah@smartroute.ai"
          required
        />

        <Input
          label="Company / Fleet Name"
          type="text"
          icon={Building}
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="AeroMobility Logistics"
          required
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="At least 8 characters"
          required
        />

        <div className="flex items-start gap-2 pt-1 text-xs text-slate-700 font-semibold">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
            required
          />
          <span>I agree to the <a href="#" className="text-blue-600 font-black hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 font-black hover:underline">Privacy Policy</a></span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={Sparkles}
          className="w-full mt-2"
        >
          Register for SmartRoute AI
        </Button>
      </form>

      <p className="text-center text-xs text-slate-700 font-bold mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-black hover:underline">
          Sign In
        </Link>
      </p>
    </Card>
  );
};
