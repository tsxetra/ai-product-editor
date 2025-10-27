
import React, { useState } from 'react';

interface PromptControlsProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PromptControls: React.FC<PromptControlsProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col items-center">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Remove the background and make it solid white"
        className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-shadow resize-none"
        rows={3}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
};

export default PromptControls;
