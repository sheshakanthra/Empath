import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Square, Loader2, Volume2, History, Settings, User, Activity, Brain, MessageSquare, Frown, HelpCircle, Share2, Trash2 } from "lucide-react";
import { cn } from '../../lib/utils';
import GlassCard from './GlassCard';

// Status Badge Component
export const StatusBadge = ({ connected }) => (
  <div className={cn(
    "flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
    connected 
      ? "bg-green-500/10 border-green-500/20 text-green-400" 
      : "bg-red-500/10 border-red-500/20 text-red-400"
  )}>
    <span className={cn("h-1.5 w-1.5 rounded-full", connected ? "bg-green-500 animate-pulse" : "bg-red-500")} />
    {connected ? "System Online" : "Connection Lost"}
  </div>
);

// Sidebar Component
export const ConversationSidebar = ({ history = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: Activity, path: '/' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="hidden xl:flex w-72 flex-col border-r border-white/5 bg-black/20 backdrop-blur-3xl p-6 h-screen overflow-hidden shrink-0">
      <Link to="/" className="flex items-center gap-2 mb-10 px-2 group">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
          <Activity className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">EmpathAI</span>
      </Link>
      
      <div className="space-y-1 mb-8">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Main Menu</div>
        {menuItems.map((item) => (
          <button 
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
              location.pathname === item.path 
                ? "bg-white/10 text-white shadow-lg shadow-white/5" 
                : "text-gray-500 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("h-4 w-4", location.pathname === item.path ? "text-blue-400" : "group-hover:text-blue-400")} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="space-y-1 overflow-y-auto pr-2 custom-scrollbar flex-grow">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Recent Insights</div>
        {history.length > 0 ? history.map((item, i) => (
          <button key={i} className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors group flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-gray-200 truncate">{item.transcript}</div>
              <div className="text-[10px] text-gray-500 mt-1">{item.time}</div>
            </div>
          </button>
        )) : (
          <div className="px-2 py-4 text-xs text-gray-600 italic">No history yet...</div>
        )}
      </div>

      <div className="mt-auto pt-6 space-y-4">
        <button 
          onClick={() => navigate('/profile')}
          className="w-full text-left group"
        >
          <div className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all border",
            location.pathname === '/profile'
              ? "bg-white/10 border-white/20 shadow-lg shadow-white/5"
              : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
          )}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10 flex items-center justify-center font-bold text-[10px] text-white">
              EU
            </div>
            <div className="overflow-hidden flex-grow">
              <div className="text-xs font-bold text-gray-200">Enterprise User</div>
              <div className="text-[10px] text-gray-500 truncate">pro-account@empath.ai</div>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
};

// Loading Skeleton
export const CardSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-white/5 rounded-full w-1/3" />
    <div className="h-32 bg-white/5 rounded-2xl w-full" />
    <div className="space-y-2">
      <div className="h-3 bg-white/5 rounded-full w-full" />
      <div className="h-3 bg-white/5 rounded-full w-2/3" />
    </div>
  </div>
);
