import React from 'react';
import { motion } from 'framer-motion';
import { User, Activity, Shield, Award, Calendar, MapPin, Edit3 } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const Profile = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Profile Header */}
      <GlassCard className="p-10 relative">
        <div className="absolute top-8 right-8">
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 transition-colors">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-1 shadow-2xl shadow-blue-500/20">
              <div className="h-full w-full rounded-full bg-gray-900 border-2 border-gray-900 overflow-hidden">
                 <div className="h-full w-full flex items-center justify-center text-4xl font-bold">EU</div>
              </div>
            </div>
            <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-4 border-gray-900 rounded-full" />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Enterprise User</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> San Francisco, CA</span>
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Joined June 2026</span>
              <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Pro Member</span>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stats */}
        <GlassCard className="text-center">
          <Activity className="h-6 w-6 text-blue-400 mx-auto mb-4" />
          <div className="text-3xl font-bold">1.2k</div>
          <div className="text-xs text-gray-500 uppercase font-bold mt-1">Sessions Analyzed</div>
        </GlassCard>
        <GlassCard className="text-center">
          <Award className="h-6 w-6 text-purple-400 mx-auto mb-4" />
          <div className="text-3xl font-bold">98%</div>
          <div className="text-xs text-gray-500 uppercase font-bold mt-1">Empathy Accuracy</div>
        </GlassCard>
        <GlassCard className="text-center">
          <User className="h-6 w-6 text-green-400 mx-auto mb-4" />
          <div className="text-3xl font-bold">Gold</div>
          <div className="text-xs text-gray-500 uppercase font-bold mt-1">Reliability Rank</div>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-lg font-bold mb-6">Recent Emotional Activity</h3>
        <div className="space-y-4">
          {[
            { label: 'High Empathy Connection', date: '2 hours ago', emotion: 'Joyful' },
            { label: 'Conflict Resolution Support', date: '5 hours ago', emotion: 'Calm' },
            { label: 'Personal Venting Session', date: 'Yesterday', emotion: 'Relieved' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div>
                <div className="text-sm font-bold">{item.label}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{item.date}</div>
              </div>
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase">
                {item.emotion}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Profile;
