import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Key, Globe, LogOut } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const Settings = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Settings</h1>
        <p className="text-gray-400">Configure your EmpathAI experience and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-bold">Profile Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Display Name</label>
              <input type="text" defaultValue="Enterprise User" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Email Address</label>
              <input type="email" defaultValue="pro-account@empath.ai" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
            </div>
          </div>
        </GlassCard>

        {/* Theme Preferences */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-bold">Theme & Localization</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-sm font-medium">Dark Mode (Default)</span>
              <div className="h-6 w-10 bg-blue-600 rounded-full flex items-center justify-end px-1">
                <div className="h-4 w-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <span className="text-sm font-medium">Glassmorphism Intensity</span>
              <input type="range" className="w-24 accent-blue-500" />
            </div>
          </div>
        </GlassCard>

        {/* API Configuration */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Key className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-bold">API Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Gemini API Key</label>
              <div className="flex gap-2">
                <input type="password" value="••••••••••••••••" readOnly className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none" />
                <button className="bg-white/10 hover:bg-white/20 px-4 rounded-xl text-xs font-bold transition-colors">Edit</button>
              </div>
            </div>
            <p className="text-[10px] text-gray-500">Keys are encrypted and stored locally in your secure vault.</p>
          </div>
        </GlassCard>

        {/* Security */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-bold">Security & Privacy</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-sm font-medium">
              Enable Two-Factor Authentication
            </button>
            <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-sm font-medium">
              Change Account Password
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="pt-10">
        <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-bold">
          <LogOut className="h-4 w-4" />
          Log out of all sessions
        </button>
      </div>
    </div>
  );
};

export default Settings;
