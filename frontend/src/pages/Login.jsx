import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#050505] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />

      <GlassCard className="max-w-md w-full p-10" hover={false}>
        <div className="text-center mb-10">
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mx-auto mb-6">
            <Activity className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Securely access your EmpathAI workspace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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
          <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5">
            Access Dashboard
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500">
          Don't have an account? <Link to="/register" className="text-blue-400 font-bold hover:text-blue-300">Start Free Trial</Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;
