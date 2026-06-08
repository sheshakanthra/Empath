import React from 'react';

const TranscriptBox = ({ transcript }) => {
  return (
    <section className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="text-purple-400">📝</span> Transcript
      </h2>
      <div className="bg-gray-950 rounded-xl p-4 flex-grow border border-gray-800 text-gray-300 leading-relaxed overflow-y-auto">
        {transcript ? (
          <p>{transcript}</p>
        ) : (
          <p className="text-gray-600 italic">Your speech will appear here after recording...</p>
        )}
      </div>
    </section>
  );
};

export default TranscriptBox;
