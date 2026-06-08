import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Loader2, Volume2, History, Settings as SettingsIcon, User, Activity, Brain, MessageSquare, Frown, HelpCircle, Share2, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import EmotionMeter from './ui/EmotionMeter';
import WaveformVisualizer from './ui/WaveformVisualizer';
import { StatusBadge, ConversationSidebar, CardSkeleton } from './ui/LayoutComponents';
import TranscriptBox from './TranscriptBox';
import { cn } from '../lib/utils';

// Import Pages
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';

const Dashboard = ({ view = 'main' }) => {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [transcript, setTranscript] = useState('');
  const [emotion, setEmotion] = useState({ label: 'N/A', confidence: 0 });
  const [intent, setIntent] = useState('N/A');
  const [sentiment, setSentiment] = useState('N/A');
  const [aiResponse, setAiResponse] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([]);
  const [timer, setTimer] = useState(0);

  const backendUrl = 'http://localhost:8000';
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/health`);
        const data = await response.json();
        setBackendStatus(data.status === 'healthy' ? 'Connected' : 'Disconnected');
      } catch (error) {
        setBackendStatus('Disconnected');
      }
    };
    checkHealth();
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setTimer(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendAudioToBackend(audioBlob);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (e) {
      alert('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (blob) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');
    try {
      const res = await fetch(`${backendUrl}/api/transcribe`, { method: 'POST', body: formData });
      const data = await res.json();
      setTranscript(data.transcript);
      setEmotion(data.emotion);
      setIntent(data.intent);
      setSentiment(data.sentiment);
      setAiResponse(data.ai_response);
      if (data.audio_url) setAudioUrl(`${backendUrl}${data.audio_url}`);
      
      setHistory(prev => [{
        transcript: data.transcript,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emotion: data.emotion.label
      }, ...prev].slice(0, 10));
    } catch (e) {
      alert('Processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) new Audio(audioUrl).play();
  };

  const getEmotionColor = (label) => {
    const map = { Happy: 'blue', Sad: 'purple', Angry: 'red', Fearful: 'yellow', Neutral: 'green', Surprised: 'pink' };
    return map[label] || 'blue';
  };

  const renderContent = () => {
    switch (view) {
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Left Section (70%) */}
            <div className="lg:col-span-7 space-y-8">
              <GlassCard className="p-0 overflow-hidden">
                <div className="p-8 pb-4 flex justify-between items-center border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Mic className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Voice Interface</h3>
                      <p className="text-xs text-gray-500">Universal Emotion Recognition Engine</p>
                    </div>
                  </div>
                  {isRecording && (
                    <div className="flex items-center gap-3 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      <span className="text-xs font-bold text-red-400">{formatTime(timer)}</span>
                    </div>
                  )}
                </div>

                <div className="p-12 flex flex-col items-center justify-center space-y-8 bg-black/20">
                  <WaveformVisualizer isRecording={isRecording} />
                  
                  <div className="relative group">
                    <div className={cn(
                      "absolute -inset-4 rounded-full blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-40",
                      isRecording ? "bg-red-500 opacity-60" : "bg-blue-500"
                    )} />
                    <button
                      onClick={isRecording ? stopRecording : (isProcessing ? null : startRecording)}
                      disabled={isProcessing}
                      className={cn(
                        "relative h-24 w-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl transform active:scale-95",
                        isRecording 
                          ? "bg-red-600 hover:bg-red-500 shadow-red-600/20" 
                          : "bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/20",
                        isProcessing && "opacity-50 cursor-not-allowed grayscale"
                      )}
                    >
                      {isProcessing ? (
                        <Loader2 className="h-10 w-10 text-white animate-spin" />
                      ) : (
                        isRecording ? <Square className="h-10 w-10 text-white fill-white" /> : <Mic className="h-10 w-10 text-white" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-400 tracking-wide">
                    {isProcessing ? "Analyzing emotional patterns..." : (isRecording ? "Listening to your voice..." : "Click to initiate session")}
                  </p>
                </div>
              </GlassCard>

              <GlassCard className="min-h-[300px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-purple-400" />
                    <h3 className="text-lg font-bold">Smart Transcript</h3>
                  </div>
                  <button onClick={() => setTranscript('')} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-grow bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-gray-300 leading-relaxed text-lg overflow-y-auto max-h-[400px] custom-scrollbar">
                  {isProcessing ? (
                    <div className="space-y-4">
                      <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                      <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse" />
                    </div>
                  ) : (
                    transcript || <span className="text-gray-600 italic font-medium">Session transcript will manifest here...</span>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* Right Section (30%) */}
            <div className="lg:col-span-3 space-y-8">
              <GlassCard>
                <div className="flex items-center gap-3 mb-8">
                  <Activity className="h-5 w-5 text-pink-400" />
                  <h3 className="text-lg font-bold">Emotion Analysis</h3>
                </div>

                {isProcessing ? <CardSkeleton /> : (
                  <div className="flex flex-col items-center">
                    <EmotionMeter 
                      label={emotion.label} 
                      value={emotion.confidence} 
                      color={getEmotionColor(emotion.label)} 
                    />
                    
                    <div className="grid grid-cols-2 gap-4 w-full mt-10">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-colors">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Intent</span>
                        <div className="text-blue-400 font-bold flex items-center gap-2">
                          <Brain className="h-3 w-3" />
                          {intent}
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-colors">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Sentiment</span>
                        <div className="text-green-400 font-bold flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" />
                          {sentiment}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </GlassCard>

              <GlassCard className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-bold">Empathetic Insight</h3>
                </div>

                {isProcessing ? <CardSkeleton /> : (
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-200 italic leading-relaxed shadow-inner">
                      {aiResponse || "Awaiting emotional input..."}
                    </div>
                    
                    {aiResponse && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={playAudio}
                        disabled={!audioUrl}
                        className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-xl shadow-white/10"
                      >
                        <Volume2 className="h-5 w-5" />
                        Listen to Insight
                      </motion.button>
                    )}
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-white selection:bg-blue-500/30 overflow-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <ConversationSidebar history={history} />

      <div className="flex-grow flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-gray-400 capitalize">{view === 'main' ? 'Dashboard' : view}</h2>
            <div className="h-4 w-[1px] bg-white/10" />
            <StatusBadge connected={backendStatus === 'Connected'} />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[1px] hover:scale-105 transition-transform"
            >
              <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center text-[10px] font-bold">EU</div>
            </button>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto custom-scrollbar p-6 lg:p-10">
          {renderContent()}
        </main>
        
        <footer className="h-14 border-t border-white/5 flex items-center justify-center px-8 text-[10px] font-medium text-gray-500 uppercase tracking-widest bg-black/20 backdrop-blur-xl">
          Powered by EmpathAI v2.0 Enterprise • Secure Emotional Computing
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
