import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Mail, Lock, Building, Sparkles } from 'lucide-react';

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
    <Card glow className="p-8 border-[#6C63FF]/20 shadow-2xl bg-white/95 rounded-[32px]">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF2DAA] to-[#6C63FF] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#FF2DAA]/25">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight font-['Space_Grotesk']">
          Create Your Account
        </h2>
        <p className="text-sm text-[#64748B] font-semibold">
          Get Started with DecisionSphere AI Platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Full Name"
          type="text"
          icon={User}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Dr. Sarah Vance"
          required
        />

        <Input
          label="Work Email"
          type="email"
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="sarah@decisionsphere.ai"
          required
        />

        <Input
          label="Organization / Company"
          type="text"
          icon={Building}
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="AeroTech Dynamics"
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

        <div className="flex items-start gap-2 pt-1 text-xs text-[#64748B] font-semibold">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
            className="rounded border-slate-300 bg-white text-[#6C63FF] focus:ring-[#6C63FF] mt-0.5"
            required
          />
          <span>I agree to the <a href="#" className="text-[#6C63FF] font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-[#6C63FF] font-bold hover:underline">Privacy Policy</a></span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={Sparkles}
          className="w-full mt-2 bg-gradient-to-r from-[#FF2DAA] to-[#6C63FF] text-white border-none font-bold shadow-lg"
        >
          Register for DecisionSphere AI
        </Button>
      </form>

      <p className="text-center text-xs text-[#64748B] font-semibold mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-[#6C63FF] font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </Card>
  );
};
