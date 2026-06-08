import React, { useState, useRef } from 'react';

const AudioRecorder = ({ onTranscriptionComplete, backendUrl }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendAudioToBackend(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please ensure you have given permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks in the stream to release the microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    try {
      const response = await fetch(`${backendUrl}/api/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const data = await response.json();
      onTranscriptionComplete(data);
    } catch (error) {
      console.error('Error sending audio to backend:', error);
      alert('Failed to transcribe audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-blue-400">🎙️</span> Voice Input
      </h2>
      <div 
        onClick={isRecording ? stopRecording : (isProcessing ? null : startRecording)}
        className={`flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl transition-all cursor-pointer group 
          ${isRecording ? 'border-red-500 bg-red-900/20' : 'border-gray-700 bg-gray-900/50 hover:border-blue-500/50'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform
          ${isRecording ? 'bg-red-500 animate-pulse scale-110' : 'bg-blue-500 group-hover:scale-110'}`}>
          {isProcessing ? (
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isRecording ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              )}
            </svg>
          )}
        </div>
        <p className={`font-medium ${isRecording ? 'text-red-400' : 'text-gray-400'}`}>
          {isProcessing ? 'Processing Audio...' : (isRecording ? 'Click to Stop Recording' : 'Click to Start Recording')}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {isRecording ? 'Recording in progress...' : 'Speak clearly into your microphone'}
        </p>
      </div>
    </section>
  );
};

export default AudioRecorder;
