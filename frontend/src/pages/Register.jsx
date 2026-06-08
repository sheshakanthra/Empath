import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, User, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />

      <GlassCard className="max-w-md w-full p-10" hover={false}>
        <div className="text-center mb-10">
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mx-auto mb-6">
            <Activity className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm">Experience the future of empathetic AI</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input type="email" placeholder="name@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-colors" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20">
            Get Started
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-400 font-bold hover:text-blue-300">Sign In</Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;
